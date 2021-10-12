import React, { useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import LaunchList from "../components/LaunchList/LaunchList";
import { useLaunchHook } from "../hooks/useLaunchHook";
import { colorScheme } from "../theme/colors";
import { SearchBar } from "react-native-elements";
import { debounce } from "../helpers/debounce";
import EmptyList from "../components/EmptyList/EmptyList";

const HomeScreen = () => {
  const { results, response, loading, error, fetchLaunches, searchLaunches }: any = useLaunchHook();
  const [search, setSearch] = useState("");

  const loadMoreData = () => {
    if (response?.next && !loading && !error && response.count > results.length && !search) {
      fetchLaunches(response.next);
    } else if (search && response?.next && !loading && !error && response.count > results.length) {
      searchLaunches(null, response.next);
    }
  };

  const searchDebounced = useCallback(debounce(searchLaunches, 500), []);

  const updateSearch = (text: string): void => {
    setSearch(text);
    searchDebounced(text);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <SearchBar
          placeholder="Search by name ..."
          // @ts-ignore
          onChangeText={updateSearch}
          containerStyle={{ backgroundColor: colorScheme.secondaryBackground }}
          inputContainerStyle={{ backgroundColor: colorScheme.background, borderRadius: 50, paddingHorizontal: 10 }}
          value={search}
          lightTheme={true}
          round={true}
          maxLength={100}
        />
      </View>
      {!!error ? (
        <View style={{ alignItems: "center", margin: 20 }}>
          <Text style={{ color: colorScheme.error }}>Some error occurred:</Text>
          <Text style={{ color: colorScheme.error }}>{error?.message}</Text>
        </View>
      ) : (
        <LaunchList
          data={results}
          onEndReached={loadMoreData}
          loading={loading}
          ListEmptyComponent={() => (
            <EmptyList
              text={
                search
                  ? `Can not find any launch which name includes "${search}""`
                  : "The list of rocket launches is empty"
              }
            />
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
