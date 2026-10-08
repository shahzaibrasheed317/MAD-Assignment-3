import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Explore() {
  return (
    <ThemedView style={styles.container}>
      
      <ThemedText type="subtitle" style={styles.header}>
        Explore
      </ThemedText>

      <ThemedText style={styles.subtitleText}>
        Find your next book
      </ThemedText>

      <ThemedText style={styles.sectionTitle}>
        Categories
      </ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText style={styles.cardTitle}>
          Fiction
        </ThemedText>
        <ThemedText style={styles.cardDescription}>
          Adventures, fantasy and stories
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText style={styles.cardTitle}>
          Self Development
        </ThemedText>
        <ThemedText style={styles.cardDescription}>
          Improve yourself and your habits
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText style={styles.cardTitle}>
          Mystery
        </ThemedText>
        <ThemedText style={styles.cardDescription}>
          Secrets, puzzles and investigations
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText style={styles.cardTitle}>
          History
        </ThemedText>
        <ThemedText style={styles.cardDescription}>
          Stories and events from the past
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
    marginTop: 30,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 17,
    marginBottom: 35,
    opacity: 0.6, 
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
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
});