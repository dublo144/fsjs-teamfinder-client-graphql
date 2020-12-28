import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Caption, Paragraph, Title } from "react-native-paper";

const UserInformation = ({ user }) => {
  return (
    <View style={styles.userInfo}>
      <View style={{ flexDirection: "row", marginTop: 15 }}>
        <Avatar.Text size={48} label={user.name.charAt(0)} />
        <View style={{ marginLeft: 15, flexDirection: "column" }}>
          <Title style={styles.title}>{user.name}</Title>
          <Caption style={styles.caption}>{`@ ${user.userName}`}</Caption>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.section}>
          <Paragraph style={[styles.paragraph, styles.caption]}>22</Paragraph>
          <Caption style={styles.caption}>Posts found</Caption>
        </View>
        <View style={styles.section}>
          <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
          <Caption style={styles.caption}>Friends</Caption>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default UserInformation;
