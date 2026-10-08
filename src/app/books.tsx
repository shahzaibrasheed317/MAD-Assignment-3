import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Books() {
  return (
    <ThemedView style={styles.container}>
      
      <ThemedText type="subtitle" style={styles.header}>
        My Books
      </ThemedText>

      <ThemedText style={styles.subtitleText}>
        Books you've saved
      </ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText type="small" style={styles.categoryText}>FICTION</ThemedText>
        <ThemedText style={styles.bookTitle}>Harry Potter</ThemedText>
        <ThemedText style={styles.authorText}>J.K. Rowling</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="small" style={styles.categoryText}>FICTION</ThemedText>
        <ThemedText style={styles.bookTitle}>The Hobbit</ThemedText>
        <ThemedText style={styles.authorText}>J.R.R. Tolkien</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="small" style={styles.categoryText}>SELF DEVELOPMENT</ThemedText>
        <ThemedText style={styles.bookTitle}>Atomic Habits</ThemedText>
        <ThemedText style={styles.authorText}>James Clear</ThemedText>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 30,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 17,
    marginBottom: 35,
    opacity: 0.6, 
  },
  card: {
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)', // Adds a subtle border so the cards stand out from the background in both light and dark modes
  },
  categoryText: {
    opacity: 0.6,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  authorText: {
    fontSize: 16,
    marginTop: 5,
    opacity: 0.8,
  },
});