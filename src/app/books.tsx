import { View, Text } from 'react-native';

const Books = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Books</Text>
      <Text>Harry Potter</Text>
      <Text>The Alchemist</Text>
      <Text>Atomic Habits</Text>
      <Text>The Hobbit</Text>
    </View>
  );
};

export default Books;