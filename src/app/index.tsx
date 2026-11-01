import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingTop: 48,
    paddingBottom: 120,
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitleText: {
    fontSize: 18,
    marginBottom: 28,
    opacity: 0.6,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 6,
    opacity: 0.6,
  },
  infoTextBottom: {
    fontSize: 15,
    marginBottom: 30,
    opacity: 0.6,
  },
  featuredCard: {
    padding: 22,
    borderRadius: 18,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  featuredLabel: {
    fontSize: 15,
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
    opacity: 0.8,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listItem: {
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(150, 150, 150, 0.2)',
  },
  listText: {
    fontSize: 19,
  },
});