"use client";
import { useGetAllNotificationQuery } from "@/redux/api/notificationApi";
import React, { useEffect } from "react";
import { toast } from "sonner";

const Notification = () => {
  const { data, isLoading } = useGetAllNotificationQuery({});
  // console.log(data, "notification");
  return (
    <div>
      <h2>Your Notifications</h2>
      <ul>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          data?.data?.map((notification: any) => (
            <li key={notification.id}>
              {notification.message} - {notification.read ? "Read" : "Unread"}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notification;
