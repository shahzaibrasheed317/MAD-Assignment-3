import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  Alert,
  useColorScheme,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export interface BookRecord {
  id: string;
  title: string;
  author: string;
  category: string;
}

const STORAGE_KEY = '@readify_books_v1';

const FILTER_CATEGORIES = ['ALL', 'FICTION', 'SELF DEVELOPMENT', 'MYSTERY', 'HISTORY'];
const BOOK_CATEGORIES = ['FICTION', 'SELF DEVELOPMENT', 'MYSTERY', 'HISTORY'];

const INITIAL_BOOKS: BookRecord[] = [
  {
    id: '1',
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    category: 'FICTION',
  },
  {
    id: '2',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'FICTION',
  },
  {
    id: '3',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'SELF DEVELOPMENT',
  },
];

export default function Books() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Theme-adaptive monochrome palette
  const primaryBg = isDark ? '#FFFFFF' : '#111111';
  const primaryText = isDark ? '#000000' : '#FFFFFF';
  const subtleBg = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.05)';
  const inputBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const textColor = isDark ? '#FFFFFF' : '#111111';
  const mutedText = isDark ? '#A1A1AA' : '#71717A';

  // Array of objects state for CRUD records
  const [books, setBooks] = useState<BookRecord[]>([]);

  // Form states for Create & Update
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('FICTION');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  // Load records from AsyncStorage on mount
  useEffect(() => {
    loadBooksFromStorage();
  }, []);

  const loadBooksFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData !== null) {
        const parsedBooks: BookRecord[] = JSON.parse(storedData);
        setBooks(parsedBooks);
      } else {
        setBooks(INITIAL_BOOKS);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BOOKS));
      }
    } catch (error) {
      console.error('Failed to load books from storage:', error);
      setBooks(INITIAL_BOOKS);
    }
  };

  // Persist records to AsyncStorage
  const saveBooksToStorage = async (updatedBooks: BookRecord[]) => {
    try {
      setBooks(updatedBooks);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
    } catch (error) {
      console.error('Failed to save books to storage:', error);
      Alert.alert('Storage Error', 'Could not save book records locally.');
    }
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setSelectedCategory('FICTION');
    setEditingId(null);
    setShowForm(false);
  };

  // CREATE & UPDATE Operation
  const handleSaveBook = async () => {
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();

    if (!trimmedTitle || !trimmedAuthor) {
      Alert.alert('Missing Fields', 'Please enter both a book title and author.');
      return;
    }

    // Validate all records have valid fields using Array.prototype.every()
    const isValidLibrary = books.every((b) => b.title.length > 0);
    if (!isValidLibrary) {
      console.log('Validating library records');
    }

    if (editingId) {
      // UPDATE existing record using Array.prototype.map()
      const updatedList = books.map((book) =>
        book.id === editingId
          ? {
              ...book,
              title: trimmedTitle,
              author: trimmedAuthor,
              category: selectedCategory,
            }
          : book
      );
      await saveBooksToStorage(updatedList);
      resetForm();
    } else {
      // Check for duplicate title using Array.prototype.some()
      const isDuplicate = books.some(
        (book) => book.title.toLowerCase() === trimmedTitle.toLowerCase()
      );

      if (isDuplicate) {
        Alert.alert('Already Exists', 'This book is already in your saved list.');
        return;
      }

      // CREATE new record object
      const newBook: BookRecord = {
        id: Date.now().toString(),
        title: trimmedTitle,
        author: trimmedAuthor,
        category: selectedCategory,
      };

      const updatedList = [newBook, ...books];
      await saveBooksToStorage(updatedList);
      resetForm();
    }
  };

  // Select record to edit using Array.prototype.find()
  const handleEditSelect = (id: string) => {
    const targetBook = books.find((book) => book.id === id);
    if (targetBook) {
      setTitle(targetBook.title);
      setAuthor(targetBook.author);
      setSelectedCategory(targetBook.category);
      setEditingId(targetBook.id);
      setShowForm(true);
    }
  };

  // DELETE Operation using Array.prototype.filter()
  const handleDeleteBook = async (id: string) => {
    const updatedList = books.filter((book) => book.id !== id);
    await saveBooksToStorage(updatedList);
    if (editingId === id) {
      resetForm();
    }
  };

  // SEARCH & FILTER using Array.prototype.filter()
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      filterCategory === 'ALL' ||
      book.category.toUpperCase() === filterCategory.toUpperCase();

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const renderBookItem = ({ item }: { item: BookRecord }) => (
    <ThemedView style={styles.card}>
      <ThemedText type="small" style={styles.categoryText}>
        {item.category}
      </ThemedText>

      <ThemedText style={styles.bookTitle}>{item.title}</ThemedText>
      <ThemedText style={styles.authorText}>{item.author}</ThemedText>

      <View style={styles.cardActions}>
        <Pressable
          style={[styles.actionBtn, { backgroundColor: subtleBg }]}
          onPress={() => handleEditSelect(item.id)}
        >
          <Text style={[styles.actionBtnText, { color: textColor }]}>Edit</Text>
        </Pressable>

        <Pressable
          style={[styles.actionBtn, { backgroundColor: subtleBg }]}
          onPress={() => handleDeleteBook(item.id)}
        >
          <Text style={[styles.actionBtnText, { color: mutedText }]}>Delete</Text>
        </Pressable>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            {/* HEADER ROW */}
            <View style={styles.headerRow}>
              <View style={styles.headerTextWrap}>
                <ThemedText type="subtitle" style={styles.header}>
                  My Books
                </ThemedText>
                <ThemedText style={styles.subtitleText}>
                  Books you've saved ({books.length})
                </ThemedText>
              </View>

              <Pressable
                style={[styles.newBookBtn, { backgroundColor: primaryBg }]}
                onPress={() => {
                  if (showForm) {
                    resetForm();
                  } else {
                    setShowForm(true);
                  }
                }}
              >
                <Text style={[styles.newBookBtnText, { color: primaryText }]}>
                  {showForm ? 'Close' : '+ New'}
                </Text>
              </Pressable>
            </View>

            {/* CREATE / UPDATE FORM */}
            {showForm && (
              <ThemedView style={styles.formCard}>
                <ThemedText style={styles.formHeader}>
                  {editingId ? 'Update Book' : 'Add Book'}
                </ThemedText>

                <TextInput
                  style={[
                    styles.input,
                    { color: textColor, backgroundColor: inputBg },
                  ]}
                  placeholder="Book title"
                  placeholderTextColor={mutedText}
                  value={title}
                  onChangeText={setTitle}
                />

                <TextInput
                  style={[
                    styles.input,
                    { color: textColor, backgroundColor: inputBg },
                  ]}
                  placeholder="Author name"
                  placeholderTextColor={mutedText}
                  value={author}
                  onChangeText={setAuthor}
                />

                <ThemedText style={styles.fieldLabel}>Category</ThemedText>
                <View style={styles.chipRow}>
                  {BOOK_CATEGORIES.map((cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <Pressable
                        key={cat}
                        style={[
                          styles.chip,
                          {
                            backgroundColor: active ? primaryBg : 'transparent',
                            borderColor: active
                              ? primaryBg
                              : 'rgba(150, 150, 150, 0.25)',
                          },
                        ]}
                        onPress={() => setSelectedCategory(cat)}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            { color: active ? primaryText : mutedText },
                          ]}
                        >
                          {cat}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <View style={styles.formBtnRow}>
                  <Pressable
                    style={[styles.saveBtn, { backgroundColor: primaryBg }]}
                    onPress={handleSaveBook}
                  >
                    <Text style={[styles.saveBtnText, { color: primaryText }]}>
                      {editingId ? 'Save Changes' : 'Add to Books'}
                    </Text>
                  </Pressable>

                  {editingId && (
                    <Pressable
                      style={[styles.cancelBtn, { backgroundColor: subtleBg }]}
                      onPress={resetForm}
                    >
                      <Text style={[styles.cancelBtnText, { color: textColor }]}>
                        Cancel
                      </Text>
                    </Pressable>
                  )}
                </View>
              </ThemedView>
            )}

            {/* SEARCH INPUT */}
            <View style={styles.searchRow}>
              <TextInput
                style={[
                  styles.searchInput,
                  { color: textColor, backgroundColor: inputBg },
                ]}
                placeholder="Search saved books..."
                placeholderTextColor={mutedText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Pressable
                  style={[styles.clearBtn, { backgroundColor: subtleBg }]}
                  onPress={() => setSearchQuery('')}
                >
                  <Text style={[styles.clearBtnText, { color: textColor }]}>
                    Clear
                  </Text>
                </Pressable>
              )}
            </View>

            {/* HORIZONTAL CATEGORY FILTER PILLS */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              {FILTER_CATEGORIES.map((category) => {
                const active = filterCategory === category;
                return (
                  <Pressable
                    key={category}
                    style={[
                      styles.filterPill,
                      {
                        backgroundColor: active ? primaryBg : 'transparent',
                        borderColor: active
                          ? primaryBg
                          : 'rgba(150, 150, 150, 0.25)',
                      },
                    ]}
                    onPress={() => setFilterCategory(category)}
                  >
                    <Text
                      style={[
                        styles.filterPillText,
                        { color: active ? primaryText : mutedText },
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        }
        ListEmptyComponent={
          <ThemedView style={styles.emptyCard}>
            <ThemedText style={styles.emptyTitle}>No books found</ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Try another search term or tap "+ New" to add a book.
            </ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 48,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  headerTextWrap: {
    flex: 1,
    marginRight: 12,
  },
  header: {
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 16,
    opacity: 0.6,
  },
  newBookBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    flexShrink: 0,
  },
  newBookBtnText: {
    fontWeight: '600',
    fontSize: 14,
  },
  formCard: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  formHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 8,
    marginTop: 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  formBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    fontWeight: '600',
    fontSize: 15,
  },
  cancelBtn: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontWeight: '600',
    fontSize: 15,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 15,
  },
  clearBtn: {
    paddingVertical: 11,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexShrink: 0,
  },
  clearBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterScroll: {
    gap: 8,
    paddingBottom: 22,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  card: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  categoryText: {
    opacity: 0.6,
  },
  bookTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 8,
  },
  authorText: {
    fontSize: 16,
    marginTop: 5,
    opacity: 0.75,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyCard: {
    padding: 28,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },
});