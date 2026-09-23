import { View, Text } from 'react-native';

export default function Books() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        My Books
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 15 }}>
        Harry Potter
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 15 }}>
        The Alchemist
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 15 }}>
        Atomic Habits
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 15 }}>
        The Hobbit
      </Text>
    </View>
  );
}