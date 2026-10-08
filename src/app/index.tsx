import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      
      <ThemedText style={styles.header}>
        E-Book
      </ThemedText>

      <ThemedText style={styles.subtitleText}>
        Your world of books
      </ThemedText>

      <ThemedText style={styles.infoText}>
        Muhammad Shahzaib Rasheed
      </ThemedText>

      <ThemedText style={styles.infoTextBottom}>
        Roll No: 2025(S)-ADP-CS-02
      </ThemedText>

      <ThemedView style={styles.featuredCard}>
        <ThemedText style={styles.featuredLabel}>
          Featured Book
        </ThemedText>
        
        <ThemedText style={styles.featuredTitle}>
          Harry Potter
        </ThemedText>
        
        <ThemedText style={styles.featuredDesc}>
          Enter a magical world of adventure and mystery.
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.sectionTitle}>
        Popular Books
      </ThemedText>

      <ThemedView style={styles.listItem}>
        <ThemedText style={styles.listText}>
          The Alchemist
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.listItem}>
        <ThemedText style={styles.listText}>
          Atomic Habits
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.listItem}>
        <ThemedText style={styles.listText}>
          The Hobbit
        </ThemedText>
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
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 18,
    marginBottom: 35,
    opacity: 0.6, // Replaces 'gray'
  },
  infoText: {
    fontSize: 15,
    marginBottom: 8,
    opacity: 0.6,
  },
  infoTextBottom: {
    fontSize: 15,
    marginBottom: 35,
    opacity: 0.6,
  },
  featuredCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)', // Replaces hardcoded '#1E1E1E' to support both themes
  },
  featuredLabel: {
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.6,
  },
  featuredTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredDesc: {
    fontSize: 16,
    opacity: 0.8, // Replaces 'lightgray'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  listItem: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  listText: {
    fontSize: 19,
  },
});