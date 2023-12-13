import axios from 'axios';
import { BACKEND_URL } from "../constants";
import { auth } from '../firebase';

const AuthAPI = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 304;
  },
});


AuthAPI.interceptors.request.use(
  async (config) => {
    try {
      const user: any = await new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
          resolve(user);
        }, reject);
      });

      if (user) {
        const token = await user?.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      delete config.headers.Authorization;
    } finally {
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

//회원가입
export const postSignUp = ({ email, name, gender, phone, referrer_path, uid }: { email: string, name: string, gender: string, phone: string, referrer_path: string, uid: string }) => {
  return AuthAPI.post(`/users/sign_up`, {
    email: email,
    name: name,
    gender: gender,
    phone: phone,
    referrer_path: referrer_path,
    uid: uid,
  });
};

export const postCreateEvent = ({ title, location, description, start_time, end_time, max_members_count, user_id }: {
  title: string,
  location: string,
  description: string,
  start_time: any,
  end_time: any,
  max_members_count: number,
  user_id: number,
}) => {
  return AuthAPI.post('/events', {
    title: title,
    location: location,
    description: description,
    start_time: start_time,
    end_time: end_time,
    max_members_count: max_members_count,
    user_id: user_id,
  })
}

export const getEvent = ({ event_id }: { event_id: string }) => {
  return AuthAPI.get(`/events/${event_id}`);
}

export const patchEvent = ({ event_id, title, location, description, start_time, end_time, max_members_count, user_id }: {
  event_id: string,
  title: string,
  location: string,
  description: string,
  start_time: any,
  end_time: any,
  max_members_count: number,
  user_id: number,
}) => {
  return AuthAPI.patch(`/events/${event_id}`, {
    title: title,
    location: location,
    description: description,
    start_time: start_time,
    end_time: end_time,
    max_members_count: max_members_count,
    user_id: user_id,
  })
}