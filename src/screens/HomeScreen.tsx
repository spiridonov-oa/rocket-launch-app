import React from "react";
import { View, Text, Switch, Button } from "react-native";
import LaunchList from "../components/LaunchList/LaunchList";
import { useLaunchHook } from "../hooks/useLaunchHook";
import { colorScheme } from "../theme/colors";
import { SearchBar } from "react-native-elements";
import EmptyList from "../components/EmptyList/EmptyList";
import ErrorView from "../components/ErrorView/ErrorView";

const HomeScreen = () => {
  const {
    list,
    searchList,
    loading,
    error,
    searchQuery,
    mockData,
    loadNextPage,
    setSearchQuery,
    initFetch,
    initSearch,
    toggleMockData,
  }: any = useLaunchHook();

  const getEmptyListTest = () => {
    if (loading) {
      return "Loading...";
    } else if (searchQuery) {
      if (searchQuery.length < 3) {
        return `Type at least 3 symbols "${searchQuery}"`;
      }
      return `Can not find any launch which name includes "${searchQuery}"`;
    } else {
      return "The list of rocket launches is empty";
    }
  };

  const loadMore = () => {
    loadNextPage();
  };

  const updateSearch = (text: string): void => {
    setSearchQuery(text);
  };

  const onRefresh = () => {
    searchQuery ? initSearch(searchQuery) : initFetch();
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        {mockData && (
          <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
            <Switch onValueChange={toggleMockData} value={mockData} />
            <Text style={{ color: colorScheme.placeholderText, marginLeft: 10 }}>Mock data</Text>
          </View>
        )}
        <SearchBar
          placeholder="Search by name ..."
          // @ts-ignore
          onChangeText={updateSearch}
          containerStyle={{ backgroundColor: colorScheme.secondaryBackground }}
          inputContainerStyle={{ backgroundColor: colorScheme.background, borderRadius: 50, paddingHorizontal: 10 }}
          value={searchQuery}
          lightTheme={true}
          round={true}
          maxLength={100}
        />
      </View>
      {!!error ? (
        <ErrorView message={error.message}>
          <View style={{ marginTop: 50, alignItems: "center" }}>
            <Button onPress={initFetch} title="Try again" color={colorScheme.primary} />
            <Text style={{ color: colorScheme.placeholderText, marginVertical: 20 }}>You can switch to mock data</Text>
            <Switch onValueChange={toggleMockData} value={mockData} />
          </View>
        </ErrorView>
      ) : (
        <LaunchList
          data={searchQuery ? searchList : list}
          onEndReached={loadMore}
          loading={loading}
          refreshing={loading && (searchQuery ? !searchList.length : !list.length)}
          onRefresh={onRefresh}
          ListEmptyComponent={() => <EmptyList text={getEmptyListTest()} loading={loading} />}
        />
      )}
    </View>
  );
};

export default HomeScreen;
