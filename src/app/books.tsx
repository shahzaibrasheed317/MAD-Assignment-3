import { View, Text } from 'react-native';

export default function Books() {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>

      <Text
        style={{
          color: 'white',
          fontSize: 34,
          fontWeight: 'bold',
          marginTop: 30,
          marginBottom: 8,
        }}
      >
        My Books
      </Text>

      <Text
        style={{
          color: 'gray',
          fontSize: 17,
          marginBottom: 35,
        }}
      >
        Books you've saved
      </Text>

      <View
        style={{
          backgroundColor: '#181818',
          padding: 20,
          borderRadius: 18,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: 'gray', fontSize: 14 }}>
          FICTION
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 8,
          }}
        >
          Harry Potter
        </Text>

        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            marginTop: 5,
          }}
        >
          J.K. Rowling
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#181818',
          padding: 20,
          borderRadius: 18,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: 'gray', fontSize: 14 }}>
          FICTION
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 8,
          }}
        >
          The Hobbit
        </Text>

        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            marginTop: 5,
          }}
        >
          J.R.R. Tolkien
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#181818',
          padding: 20,
          borderRadius: 18,
          marginBottom: 15,
        }}
      >
        <Text style={{ color: 'gray', fontSize: 14 }}>
          SELF DEVELOPMENT
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 8,
          }}
        >
          Atomic Habits
        </Text>

        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            marginTop: 5,
          }}
        >
          James Clear
        </Text>
      </View>

    </View>
  );
}