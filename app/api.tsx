import axios from 'axios';
import { auth } from '../firebase';
import { url } from 'inspector';
import useSWR, { SWRConfig } from 'swr'

const AuthAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
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


export const fetcher = ({
  url: url,
  method: method,
  data: data,
}: {
  url: string,
  method: string,
  data?: any,
}) => {
  return AuthAPI({
    url: url,
    method: method,
    data: data,
  })
}


//회원가입
export const postSignUp = ({ email, name, gender, phone, referrer_path, uid, birth }: { email: string, name: string, gender: string, phone: string, referrer_path: string, uid: string, birth: any }) => {
  return AuthAPI.post(`/users/sign_up`, {
    email: email,
    name: name,
    gender: gender,
    phone: phone,
    referrer_path: referrer_path,
    uid: uid,
    birth: birth,
  });
};

export const postCreateEvent = ({ title, location, description, start_time, end_time, max_members_count, uid }: {
  title: string,
  location: string,
  description: string,
  start_time: any,
  end_time: any,
  max_members_count: number,
  uid: string,

}) => {
  return AuthAPI.post('/events', {
    title: title,
    location: location,
    description: description,
    start_time: start_time,
    end_time: end_time,
    max_members_count: max_members_count,
    uid: uid,
  })
}

export const getEvent = ({ event_id }: { event_id: string }) => {
  return AuthAPI.get(`/events/${event_id}`);
}

export const patchEvent = ({ event_id, title, location, description, start_time, end_time, max_members_count, uid }: {
  event_id: string,
  title: string,
  location: string,
  description: string,
  start_time: any,
  end_time: any,
  max_members_count: number,
  uid: string,
}) => {
  return AuthAPI.patch(`/events/${event_id}`, {
    title: title,
    location: location,
    description: description,
    start_time: start_time,
    end_time: end_time,
    max_members_count: max_members_count,
    uid: uid,
  })
}

export const getActiveUsers = () => {
  return AuthAPI.get(`/users/`);
}

export const postJoinEvent = ({ event_id: eventId }: { event_id: string }) => {
  return (
    AuthAPI.post(`/events/${eventId}/attendances/apply`)
  )
}

export const deleteCancelEvent = ({ event_id: eventId }: { event_id: string }) => {
  return (
    AuthAPI.delete(`/events/${eventId}/attendances/cancel`)
  )
}



export const getEventAttendances = ({ event_id: eventId }: { event_id: string }) => {
  return (
    AuthAPI.get(`/events/${eventId}/attendances`)
  )
}

export const getEvents = () => {
  return (
    AuthAPI.get(`/events`)
  )
}

export const getCurrentMonthEvents = ({ year, month }: { year: string, month: string }) => {
  return (
    AuthAPI.get(`/events`, {
      params: {
        year: year,
        month: month,
      }
    })
  )
}

export const getUsers = () => {
  return (
    AuthAPI.get(`/admin/users`)
  )
}

export const patchRole = ({ uid, role }: { uid: string, role: string }) => {
  return (
    AuthAPI.patch("/admin/users/change_role", {
      uid: uid,
      role: role,
    })
  )
}

export const deleteEvent = ({ eventId }: { eventId: string }) => {
  return (
    AuthAPI.delete(`/events/${eventId}`)
  )
}

export const getApplyEvent = () => {
  return (
    AuthAPI.get(`/my_attended_events`)
  )
}

export const getMe = () => {
  return (
    AuthAPI.get(`/me`)
  )
}

export const patchUser = ({ uid, birth, name }: any) => {
  return (
    AuthAPI.patch(`/admin/users/${uid}`, {
      birth: birth,
      name: name,
    })
  )
}

export const deleteUser = ({ uid }: any) => {
  return (
    AuthAPI.delete(`/admin/users/${uid}`)
  )
}