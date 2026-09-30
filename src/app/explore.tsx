import { View, Text } from 'react-native';

export default function Explore() {
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
        Explore
      </Text>

      <Text
        style={{
          color: 'gray',
          fontSize: 17,
          marginBottom: 35,
        }}
      >
        Find your next book
      </Text>

      <Text
        style={{
          color: 'white',
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 18,
        }}
      >
        Categories
      </Text>

      <View
        style={{
          backgroundColor: '#181818',
          padding: 22,
          borderRadius: 18,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}>
          Fiction
        </Text>

        <Text style={{ color: 'gray', fontSize: 15, marginTop: 5 }}>
          Adventures, fantasy and stories
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#181818',
          padding: 22,
          borderRadius: 18,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}>
          Self Development
        </Text>

        <Text style={{ color: 'gray', fontSize: 15, marginTop: 5 }}>
          Improve yourself and your habits
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#181818',
          padding: 22,
          borderRadius: 18,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}>
          Mystery
        </Text>

        <Text style={{ color: 'gray', fontSize: 15, marginTop: 5 }}>
          Secrets, puzzles and investigations
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#181818',
          padding: 22,
          borderRadius: 18,
          marginBottom: 12,
        }}
      >
        <Text style={{ color: 'white', fontSize: 21, fontWeight: 'bold' }}>
          History
        </Text>

        <Text style={{ color: 'gray', fontSize: 15, marginTop: 5 }}>
          Stories and events from the past
        </Text>
      </View>

    </View>
  );
}