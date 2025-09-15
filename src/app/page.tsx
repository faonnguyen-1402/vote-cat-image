'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './globals.css';
import DarkMode from '@/components/DarkMode/DarkMode';
import MyVotes from '@/components/MyVotes/MyVotes';
import toast from 'react-hot-toast';

interface catImage {
  id: string;
  url: string;
}

interface Vote {
  id: string;
  image_id: string;
  value: number;
  image: { id: string; url: string };
}

export default function Home() {
  const [cats, setCats] = useState<catImage[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [subId, setSubId] = useState<string | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_CAT_API_KEY || '';
  const [isActiveItems, setActiveItems] = useState<Record<string, boolean>>({});
  const [myTab, setMyTab] = useState<'Gallery' | 'My votes'>('Gallery');
  const [myVotes, setMyVotes] = useState<Vote[]>([]);
  // dark mode
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    let id = localStorage.getItem('sub_id');
    if (!id) {
      id = `user_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('sub_id', id);
    }
    setSubId(id);
    fetchVotes(id);
  }, []);

  const fetchCats = async () => {
    try {
      const res = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=10',
        {
          headers: {
            'x-api-key': API_KEY,
            Accept: 'application/json',
          },
        }
      );
      const data: catImage[] = await res.json();
      setCats(data);
    } catch (error) {
      console.error('error', error);
      toast.error("can't fetch cats");
    }
  };

  const fetchVotes = async (id: string) => {
    try {
      const res = await fetch(
        `https://api.thecatapi.com/v1/votes?sub_id=${id}`,
        {
          headers: {
            'x-api-key': API_KEY,
            Accept: 'application/json',
          },
        }
      );
      const data: Vote[] = await res.json();
      const users: Record<string, number> = {};
      data.forEach((item) => {
        users[item.image_id] = (users[item.image_id] || 0) + item.value;
      });
      setVotes(users);
      setMyVotes(data);
    } catch (error) {
      console.error('super err', error);
      toast.error("can't fetch votes");
    }
  };

  const handleVotes = async (imageId: string, value: number) => {
    try {
      if (isActiveItems[imageId]) return;
      setActiveItems((prev) => ({
        ...prev,
        [imageId]: true,
      }));
      setVotes((prev) => ({
        ...prev,
        [imageId]: (prev[imageId] || 0) + value,
      }));
      const res = await fetch('https://api.thecatapi.com/v1/votes', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          image_id: imageId,
          sub_id: subId,
          value,
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      if (subId) fetchVotes(subId);
      console.log('object', myVotes);
    } catch (error) {}
  };

  const handleChangeTab = () => {
    setMyTab(myTab === 'Gallery' ? 'My votes' : 'Gallery');
    console.log(myTab, 'tab');
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <div className={`page-container ${darkMode ? 'dark' : ''}`}>
      <DarkMode darkMode={darkMode} onchange={setDarkMode} />
      <h1 className='gradient-text text-4xl font-bold'>SUPER CATS</h1>
      <div className='container-button-tab'>
        <button className='refresh-cats' onClick={() => handleChangeTab()}>
          Change your tab
        </button>
      </div>

      <p className='my-tab'>My tab : {myTab}</p>
      {myTab === 'My votes' ? (
        <MyVotes myVotes={myVotes} />
      ) : (
        <div>
          <div className='container-button-tab'>
            <button className='refresh-cats' onClick={() => fetchCats()}>
              Refresh image
            </button>
          </div>

          <div className='container-catList'>
            {cats.map((item) => (
              <div className='item' key={item.id}>
                <Image
                  src={item.url}
                  alt='no image'
                  width={300}
                  height={300}
                  className='object-cover'
                />
                <div className='button'>
                  <button
                    onClick={() => handleVotes(item.id, 1)}
                    className='like-button'
                  >
                    Like 🥰
                  </button>
                  <h1 className='score'>{votes[item.id] ?? 0}</h1>
                  <button
                    onClick={() => handleVotes(item.id, -1)}
                    className='like-button'
                  >
                    Dislike 👎
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
