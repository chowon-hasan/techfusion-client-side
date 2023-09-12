// import React from 'react';
import "../../../../src/responsives.css";
import { useContext } from "react";
import { AuthContext } from "../../../Authprovider/Auth";
import useFetch from "../../../Hooks/useFetch";

const HelpCenter = () => {
  const { users } = useContext(AuthContext);
  const { FetchData } = useFetch("userinfoemail", users?.email);
  const [data] = FetchData || [];
  const { name } = data || {};

  return (
    <section className="helpcenter" style={{ width: "680px" }}>
      <div className="border border-slate-700 p-3">
        <h1 className="text-2xl font-bold capitalize text-center">
          Application Features and guidelines
        </h1>
        <div className="my-2">
          <p>
            Welcome{" "}
            <span className="text-lime-300">
              {name ? name : users?.displayName}
            </span>{" "}
            ! <br /> i am delighted to have you here. This is your guide to
            navigating and making the most of TechFusion. Whether you`re a
            newcomer or a seasoned user, this space is designed to help you
            discover about this platform. Explore the wealth of features that
            await you, gain insights into best practices, and find answers to
            any questions you may have. Let`s dive in and unlock the full
            potential of TechFusion together! Happy exploring!
          </p>
        </div>
        <div className="">
          <p className="text-lg text-lime-300">1. User Dashboard</p>
          <p className="mb-3">
            In your dashboard you will see a greating Message from TechFusion
            and in the left navbar you will see some menus.{" "}
          </p>
          <ul style={{ listStyle: "inherit", paddingLeft: "16px" }}>
            <li className="mb-3">
              <span className="text-lime-300">Personal Information</span> : From
              here you can update your personal Information like image, name,
              title or bio. You can also see here your joining date. after
              clicking on the Apply changes button a notification will show and
              after reloading you will see your changes that you made.{" "}
            </li>
            <li className="mb-3">
              <span className="text-lime-300">Create a post</span> : You can
              create a post from this space. You can ask a qusetion with title,
              description, code snippet, technology keywords and you can also
              attached a image or a screen shot. after submit you will see a
              notification that will help you to understand about the operation
              and you will see your post in home page and also can see in your
              dashboard > all post.
            </li>
            <li className="mb-3">
              <span className="text-lime-300">All post</span> : All of your post
              will show in this space. In future you will see here all comments
              and reaction on a single post and also can see a chart with your
              post activity and post reaction.
            </li>
            <li className="mb-3">
              <span className="text-lime-300">Log out</span> : By clicking on
              this button you can log out your self from TechFusion. But you can
              obviously log in again and all of your activity and history will
              be stored.
            </li>
          </ul>
        </div>

        {/* __________________________________ */}

        <div className="mt-3">
          <p className="text-lg text-lime-300">2. Home Page</p>
          <p className="mb-3">
            In this home page you will see all post that are created by other
            users. you can also see a left navbar in the left of the viewport.
            in the middle all the post will visiable and in right you will see
            some news.
          </p>
          <ul style={{ listStyle: "inherit", paddingLeft: "16px" }}>
            <li className="mb-3">
              <span className="text-lime-300">All Question</span> : In this
              space all the qustion will stored with the technology keywords.
              This feature will active in future.
            </li>
            <li className="mb-3">
              <span className="text-lime-300">Tags</span> : All tags are stored
              here with a description and popularity. This feature will active
              soon.
            </li>
            <li className="mb-3">
              <span className="text-lime-300">Users</span> : All the users of
              TechFusion are visiable in here. you can mail them and can sent
              Messages them. This Messages will show on their inbox.
            </li>
            <li className="mb-3">
              <span className="text-lime-300">Companies</span> : This is just a
              demo section and all the data are collected from json Placeholder.
            </li>
            <li className="mb-3">
              <span className="text-lime-300">Top News</span> : In the home page
              you will see on the right side of viewport there are lots of news
              that realated to the technology. By clicking see full news you
              will see a notification. This feature will active soon.
            </li>
            <li className="mb-3">
              <span className="text-lime-300">Search Bar</span> : In search bar
              you can search the qustions by keywords.
            </li>
          </ul>
        </div>

        {/* __________________________________ */}

        <div className="mt-3">
          <p className="text-lg text-lime-300">
            3. Upmark, Downmark and comments
          </p>
          <p>
            You can give a upmark or a downmark each and every post. and you can
            also put a comment on a post. Upmark Downmark and comments will be
            stored in database.
          </p>
        </div>

        {/* __________________________________ */}

        <div className="mt-3">
          <p className="text-lg text-lime-300">4. Inbox</p>
          <p>
            In the header you can see a paper plane button and this is your
            inbox where you can found users messages. Soon you can see your sent
            messages also in inbox space.
          </p>
        </div>

        {/* __________________________________ */}

        <div className="mt-3">
          <p className="text-lg text-lime-300">5. Bookmark</p>
          <p>
            In every post you will see a bookmark button. by clicking this
            button those post will be bookmarked and you can see your bookmarked
            list in your bookmark space. You can see that in your header >
            bookmark
          </p>
        </div>

        {/* __________________________________ */}

        <div className="mt-3">
          <p className="text-lg text-lime-300">6. Important</p>
          <p>
            This application is made only for practice purpose. Whole
            application and all the features are implimented by Chowon hasan.
            This is a complete demo project for my own and there is no other
            intension.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;
