import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Animated,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { colors, fonts, normalize } from 'config';

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'space-between',
    paddingTop: 100,
  },
  suggestionsRowContainer: {
    padding: 5,
    flexDirection: 'row',
    paddingRight: 15,
    paddingBottom: 15,
  },
  userAvatarBox: {
    width: 35,
    paddingTop: 2,
  },
  userIconBox: {
    margin: 5,
    height: 25,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
  usernameInitials: {
    color: '#fff',
    ...fonts.fontPrimaryBold,
  },
  userDetailsBox: {
    flex: 1,
    margin: 5,
  },
  displayName: {
    fontSize: 12,
    fontWeight: '500',
  },
  usernameText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
});

export class MentionArea extends Component {
  props: {
    users: Array,
    trigger: string,
    text: string,
    height: number,
    style: Object,
  };

  state: {
    height: number,
    tracking: boolean,
  };

  constructor() {
    super();

    this.state = {
      height: new Animated.Value(0),
      tracking: false,
    };
  }

  componentDidUpdate() {
    const { text, trigger } = this.props;

    if (text[text.length - 1] === trigger) this.startTracking();
  }

  startTracking() {
    this.isTrackingStrated = true;
    this.openSuggestionsPanel();
    this.setState({ tracking: true });
  }

  stopTracking() {
    this.isTrackingStrated = false;
    this.closeSuggestionsPanel();
    this.setState({ tracking: false });
  }

  openSuggestionsPanel() {
    Animated.spring(this.state.height, {
      duration: 100,
      toValue: this.props.height,
      friction: 4,
    }).start();
  }

  onSuggestionTap(user, close) {
    console.log(user, close);
  }

  renderSuggestionsRow(users) {
    console.log(users);
    return users.map(user =>
      <TouchableHighlight onPress={() => this.onSuggestionTap(user, true)}>
        <View style={styles.suggestionsRowContainer}>
          <View style={styles.userAvatarBox}>
            <View style={styles.userIconBox}>
              <Text style={styles.usernameInitials}>
                {user.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.userDetailsBox}>
            <Text style={styles.displayNameText}>
              {user}
            </Text>
            <Text style={styles.usernameText}>
              @{user}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    console.log('in render mentionarea');
    return (
      <View>
        <Text>haiya</Text>
      </View>
      // <Animated.View style={[{ ...this.props.style }, { height: this.state.height }]}>
      //   <ScrollView>
      //     {console.log(this.renderSuggestionsRow(this.props.users))}
      //   </ScrollView>
      // </Animated.View>
    );
  }
}
