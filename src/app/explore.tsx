import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

interface CategoryOption {
  title: string;
  description: string;
  query: string;
}

const STORAGE_KEY = '@readify_books_v1';

const CATEGORIES: CategoryOption[] = [
  {
    title: 'Fiction',
    description: 'Adventures, fantasy and stories',
    query: 'subject:fiction',
  },
  {
    title: 'Self Development',
    description: 'Improve yourself and your habits',
    query: 'atomic+habits+self+improvement',
  },
  {
    title: 'Mystery',
    description: 'Secrets, puzzles and investigations',
    query: 'subject:mystery',
  },
  {
    title: 'History',
    description: 'Stories and events from the past',
    query: 'subject:history',
  },
];

export default function Explore() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Theme-adaptive monochrome palette
  const primaryBg = isDark ? '#FFFFFF' : '#111111';
  const primaryText = isDark ? '#000000' : '#FFFFFF';
  const subtleBg = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.05)';
  const inputBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const textColor = isDark ? '#FFFFFF' : '#111111';
  const mutedText = isDark ? '#A1A1AA' : '#71717A';
  const activeBorderColor = isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)';

  const [books, setBooks] = useState<OpenLibraryDoc[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Fiction');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [savedKeys, setSavedKeys] = useState<string[]>([]);

  useEffect(() => {
    fetchBooksFromApi('subject:fiction', 'Fiction');
  }, []);

  const fetchBooksFromApi = async (queryParam: string, label: string) => {
    setLoading(true);
    setError(null);
    setActiveCategory(label);

    try {
      const endpoint = `https://openlibrary.org/search.json?q=${encodeURIComponent(
        queryParam
      )}&limit=10&fields=key,title,author_name,first_publish_year`;

      const response = await axios.get(endpoint);

      if (response.data && Array.isArray(response.data.docs)) {
        setBooks(response.data.docs);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.error('API Fetch Error:', err);
      setError('Could not load books right now. Check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSearch = () => {
    const trimmed = customQuery.trim();
    if (!trimmed) {
      return;
    }
    fetchBooksFromApi(trimmed, trimmed);
  };

  const handleSaveToMyBooks = async (item: OpenLibraryDoc) => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      const existingBooks = storedData ? JSON.parse(storedData) : [];

      const authorName =
        item.author_name && item.author_name.length > 0
          ? item.author_name[0]
          : 'Unknown Author';

      const alreadyExists = existingBooks.some(
        (b: { title: string }) =>
          b.title.toLowerCase() === item.title.toLowerCase()
      );

      if (alreadyExists) {
        Alert.alert('Saved', `"${item.title}" is already in My Books.`);
        return;
      }

      const categoryLabel = CATEGORIES.some((c) => c.title === activeCategory)
        ? activeCategory.toUpperCase()
        : 'FICTION';

      const newBookRecord = {
        id: Date.now().toString(),
        title: item.title,
        author: authorName,
        category: categoryLabel,
      };

      const updatedBooks = [newBookRecord, ...existingBooks];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBooks));
      setSavedKeys((prev) => [...prev, item.key]);
    } catch (err) {
      console.error('Failed to save API book:', err);
      Alert.alert('Error', 'Could not save book locally.');
    }
  };

  const renderApiBook = ({ item }: { item: OpenLibraryDoc }) => {
    const author =
      item.author_name && item.author_name.length > 0
        ? item.author_name.slice(0, 2).join(', ')
        : 'Unknown Author';
    const isSaved = savedKeys.includes(item.key);

    return (
      <ThemedView style={styles.bookCard}>
        <ThemedText type="small" style={styles.metaText}>
          {activeCategory.toUpperCase()}
          {item.first_publish_year ? ` • ${item.first_publish_year}` : ''}
        </ThemedText>

        <ThemedText style={styles.bookTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.bookAuthor}>{author}</ThemedText>

        <Pressable
          style={[
            styles.saveBtn,
            {
              backgroundColor: isSaved ? primaryBg : subtleBg,
              borderColor: isSaved ? primaryBg : 'rgba(150, 150, 150, 0.2)',
            },
          ]}
          onPress={() => handleSaveToMyBooks(item)}
        >
          <Text
            style={[
              styles.saveBtnText,
              { color: isSaved ? primaryText : textColor },
            ]}
          >
            {isSaved ? 'Saved to My Books' : '+ Save to My Books'}
          </Text>
        </Pressable>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item, index) => item.key || String(index)}
        renderItem={renderApiBook}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <ThemedText type="subtitle" style={styles.header}>
              Explore
            </ThemedText>

            <ThemedText style={styles.subtitleText}>
              Find your next book
            </ThemedText>

            {/* SEARCH BAR */}
            <View style={styles.searchRow}>
              <TextInput
                style={[
                  styles.searchInput,
                  { color: textColor, backgroundColor: inputBg },
                ]}
                placeholder="Search Open Library..."
                placeholderTextColor={mutedText}
                value={customQuery}
                onChangeText={setCustomQuery}
                onSubmitEditing={handleCustomSearch}
              />
              <Pressable
                style={[styles.searchBtn, { backgroundColor: primaryBg }]}
                onPress={handleCustomSearch}
              >
                <Text style={[styles.searchBtnText, { color: primaryText }]}>
                  Search
                </Text>
              </Pressable>
            </View>

            <ThemedText style={styles.sectionTitle}>
              Categories
            </ThemedText>

            {/* ORIGINAL CATEGORY CARDS (TAPPABLE TO FETCH API DATA) */}
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.title;
              return (
                <Pressable
                  key={cat.title}
                  onPress={() => fetchBooksFromApi(cat.query, cat.title)}
                >
                  <ThemedView
                    style={[
                      styles.card,
                      isSelected && { borderColor: activeBorderColor },
                    ]}
                  >
                    <ThemedText style={styles.cardTitle}>
                      {cat.title}
                    </ThemedText>
                    <ThemedText style={styles.cardDescription}>
                      {cat.description}
                    </ThemedText>
                  </ThemedView>
                </Pressable>
              );
            })}

            <ThemedText style={[styles.sectionTitle, styles.resultsHeading]}>
              {activeCategory} Books
            </ThemedText>

            {/* LOADING STATE */}
            {loading && (
              <ThemedView style={styles.statusBox}>
                <ActivityIndicator size="small" color={textColor} />
                <ThemedText style={styles.statusText}>
                  Loading books...
                </ThemedText>
              </ThemedView>
            )}

            {/* ERROR STATE */}
            {!loading && error && (
              <ThemedView style={styles.statusBox}>
                <ThemedText style={styles.errorText}>{error}</ThemedText>
                <Pressable
                  style={[styles.retryBtn, { backgroundColor: primaryBg }]}
                  onPress={() =>
                    fetchBooksFromApi('subject:fiction', 'Fiction')
                  }
                >
                  <Text style={[styles.retryBtnText, { color: primaryText }]}>
                    Try Again
                  </Text>
                </Pressable>
              </ThemedView>
            )}
          </View>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <ThemedView style={styles.statusBox}>
              <ThemedText style={styles.statusText}>
                No books found for this search.
              </ThemedText>
            </ThemedView>
          ) : null
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
  header: {
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 17,
    marginBottom: 24,
    opacity: 0.6,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 28,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
  searchBtn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexShrink: 0,
  },
  searchBtnText: {
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultsHeading: {
    marginTop: 22,
  },
  card: {
    padding: 22,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 15,
    marginTop: 5,
    opacity: 0.6,
  },
  statusBox: {
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusText: {
    marginTop: 10,
    fontSize: 15,
    opacity: 0.6,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 15,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 14,
  },
  retryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  retryBtnText: {
    fontWeight: '600',
    fontSize: 14,
  },
  bookCard: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  metaText: {
    opacity: 0.6,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bookAuthor: {
    fontSize: 16,
    marginTop: 5,
    opacity: 0.8,
    marginBottom: 16,
  },
  saveBtn: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  saveBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
});