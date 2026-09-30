import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>

      <Text
        style={{
          fontSize: 34,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 30,
          marginBottom: 8,
        }}
      >
        E-Book
      </Text>

      <Text
        style={{
          fontSize: 18,
          color: 'gray',
          marginBottom: 35,
        }}
      >
        Your world of books
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: 'gray',
          marginBottom: 8,
        }}
      >
        Muhammad Shahzaib Rasheed
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: 'gray',
          marginBottom: 35,
        }}
      >
        Roll No: 2025(S)-ADP-CS-02
      </Text>

      <View
        style={{
          backgroundColor: '#1E1E1E',
          padding: 20,
          borderRadius: 15,
          marginBottom: 30,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: 'gray',
            marginBottom: 8,
          }}
        >
          Featured Book
        </Text>

        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 8,
          }}
        >
          Harry Potter
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: 'lightgray',
          }}
        >
          Enter a magical world of adventure and mystery.
        </Text>
      </View>

      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: 'white',
          marginBottom: 18,
        }}
      >
        Popular Books
      </Text>

      <View
        style={{
          backgroundColor: '#1E1E1E',
          padding: 18,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 19, color: 'white' }}>
          The Alchemist
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#1E1E1E',
          padding: 18,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 19, color: 'white' }}>
          Atomic Habits
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#1E1E1E',
          padding: 18,
          borderRadius: 12,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 19, color: 'white' }}>
          The Hobbit
        </Text>
      </View>

    </View>
  );
}