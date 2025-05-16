import { useState, useEffect } from 'react';

export default function App() {
  // Channel data
  const channels = {
    dancingDJ: {
      name: "Dancing & DJ",
      description: "Dance to the beat of the latest DJ hits and party anthems. Perfect for workouts, parties, or just keeping your energy high!",
      color: "from-blue-500 to-indigo-600",
      accent: "bg-blue-500"
    },
    lofi: {
      name: "Lofi",
      description: "Relax and focus with the best lofi chill beats. Ideal for studying, working, or unwinding after a long day.",
      color: "from-green-500 to-teal-600",
      accent: "bg-green-500"
    },
    moodLifting: {
      name: "Mood Lifting",
      description: "Uplift your mood with these positive and cheerful songs. Perfect for brightening your day and boosting your spirits.",
      color: "from-yellow-400 to-orange-500",
      accent: "bg-yellow-400"
    },
    nepali: {
      name: "Nepali Songs",
      description: "Enjoy the best of Nepali music across all genres, from traditional folk songs to modern Nepali pop hits.",
      color: "from-red-500 to-pink-600",
      accent: "bg-red-500"
    },
    nepaliDancing: {
      name: "Nepali Dancing",
      description: "Get your dance on with the hottest Nepali dance tracks! Traditional and modern Nepali songs that'll make you want to move.",
      color: "from-purple-500 to-indigo-600",
      accent: "bg-purple-500"
    }
  };

  // Mock songs data
  const [songs, setSongs] = useState({
    dancingDJ: [
      { id: "dj1", title: "Dance Beat Mix 2023", artist: "DJ DanceMaster", thumbnail: "https://picsum.photos/id/1/300/300 " },
      { id: "dj2", title: "Club Party Vibe", artist: "DJ NightLife", thumbnail: "https://picsum.photos/id/2/300/300 " },
      { id: "dj3", title: "Electro House Mix", artist: "DJ Energy", thumbnail: "https://picsum.photos/id/3/300/300 " }
    ],
    lofi: [
      { id: "lofi1", title: "Lofi Chill Mix", artist: "Chill Vibes", thumbnail: "https://picsum.photos/id/4/300/300 " },
      { id: "lofi2", title: "Rainy Day Beats", artist: "Lofi Master", thumbnail: "https://picsum.photos/id/5/300/300 " },
      { id: "lofi3", title: "Study Focus Music", artist: "Lofi Study", thumbnail: "https://picsum.photos/id/6/300/300 " }
    ],
    moodLifting: [
      { id: "mood1", title: "Happy Vibes", artist: "Sunshine Music", thumbnail: "https://picsum.photos/id/7/300/300 " },
      { id: "mood2", title: "Positive Energy", artist: "Good Vibes Only", thumbnail: "https://picsum.photos/id/8/300/300 " },
      { id: "mood3", title: "Uplifting Melodies", artist: "Happy Tunes", thumbnail: "https://picsum.photos/id/9/300/300 " }
    ],
    nepali: [
      { id: "nepali1", title: "Nepali Folk Song", artist: "Nepali Traditional", thumbnail: "https://picsum.photos/id/10/300/300 " },
      { id: "nepali2", title: "Classic Nepali Melody", artist: "Nepali Legends", thumbnail: "https://picsum.photos/id/11/300/300 " },
      { id: "nepali3", title: "Modern Nepali Hits", artist: "Nepali Pop", thumbnail: "https://picsum.photos/id/12/300/300 " }
    ],
    nepaliDancing: [
      { id: "nepaliDancing1", title: "Nepali Dance Party", artist: "Nepali Dance Crew", thumbnail: "https://picsum.photos/id/13/300/300 " },
      { id: "nepaliDancing2", title: "Festive Nepali Beats", artist: "Nepali Party", thumbnail: "https://picsum.photos/id/14/300/300 " },
      { id: "nepaliDancing3", title: "Traditional Nepali Dance", artist: "Nepali Cultural", thumbnail: "https://picsum.photos/id/15/300/300 " }
    ]
  });

  // State management
  const [currentChannel, setCurrentChannel] = useState("dancingDJ");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [ratings, setRatings] = useState({});
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes

  // Get current channel info
  const currentChannelInfo = channels[currentChannel];

  // Get current song
  const currentSong = songs[currentChannel][currentSongIndex];

  // Auto play next song when current ends
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentTime(prevTime => {
        if (prevTime >= duration) {
          // Move to next song
          setCurrentTime(0);
          setCurrentSongIndex(prevIndex => (prevIndex + 1) % songs[currentChannel].length);
          return 0;
        }
        return prevTime + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentSongIndex, duration, currentChannel]);

  // Skip to next song
  const skipSong = () => {
    setCurrentTime(0);
    setCurrentSongIndex((currentSongIndex + 1) % songs[currentChannel].length);
  };

  // Rate song
  const rateSong = (rating) => {
    setRatings({
      ...ratings,
      [currentSong.id]: rating
    });
    skipSong();
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${currentChannelInfo.accent}`}></div>
            <h1 className="text-xl font-bold">MusicStream</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
              Sign In
            </button>
            <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Channel Selector */}
      <nav className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <ul className="flex overflow-x-auto">
            {Object.entries(channels).map(([key, info]) => (
              <li key={key}>
                <button
                  onClick={() => setCurrentChannel(key)}
                  className={`px-4 py-3 whitespace-nowrap transition-colors ${
                    currentChannel === key
                      ? `border-b-2 border-white`
                      : `text-white/70 hover:text-white`
                  }`}
                >
                  {info.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl">
              {/* Album Art */}
              <div className="relative">
                <img
                  src={currentSong.thumbnail}
                  alt={currentSong.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">{currentSong.title}</h2>
                      <p className="text-white/80">{currentSong.artist}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => rateSong('like')}
                        className={`p-2 rounded-full transition-colors ${
                          ratings[currentSong.id] === 'like'
                            ? 'bg-green-500 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => rateSong('dislike')}
                        className={`p-2 rounded-full transition-colors ${
                          ratings[currentSong.id] === 'dislike'
                            ? 'bg-red-500 text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M18 9a1 1 0 01-1 1h-6a1 1 0 110-2h6a1 1 0 011 1zM5.5 7.25a2.25 2.25 0 013.182 0l5.25 5.25a2.25 2.25 0 01-3.182 3.182L8 13.182a.75.75 0 00-1.06 0L4.406 15.72a2.25 2.25 0 01-3.182-3.182l5.25-5.25z" />
                        </svg>
                      </button>
                      <button
                        onClick={skipSong}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 3a1 1 0 011 1v1.586l2.293-2.293a1 1 0 111.414 1.414L12.414 6H16a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8a1 1 0 011-1h3.586L5.293 4.293a1 1 0 011.414-1.414L9 4.586V4a1 1 0 011-1z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${currentChannelInfo.accent}`}
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <button
                      onClick={togglePlay}
                      className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832L12 11.202V8.798L9.555 7.168z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={skipSong}
                      className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832L12 11.202V8.798L9.555 7.168z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Volume Control */}
                    <div className="hidden sm:flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                      </svg>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                        className="w-24 h-1 rounded-full appearance-none bg-white/20"
                      />
                    </div>

                    {/* Shuffle Button */}
                    <button className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Songs */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Upcoming Songs</h2>
              <div className="space-y-2">
                {songs[currentChannel]
                  .slice(currentSongIndex + 1, currentSongIndex + 5)
                  .map((song) => (
                    <div
                      key={song.id}
                      className="flex items-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={song.thumbnail}
                        alt={song.title}
                        className="w-12 h-12 rounded object-cover mr-3"
                      />
                      <div>
                        <h3 className="font-medium">{song.title}</h3>
                        <p className="text-sm text-white/70">{song.artist}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Channel Info Section */}
          <div>
            <div className="bg-white/5 rounded-xl p-6 mb-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-3">About {currentChannelInfo.name}</h2>
              <div className="h-1 w-12 rounded-full mb-4" style={{ backgroundColor: currentChannelInfo.accent }}></div>
              <p className="text-white/80">{currentChannelInfo.description}</p>
            </div>

            {/* Popular Channels */}
            <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4">Other Channels</h2>
              <div className="space-y-2">
                {Object.entries(channels).map(([key, info]) => {
                  if (key === currentChannel) return null;
                  return (
                    <button
                      key={key}
                      onClick={() => setCurrentChannel(key)}
                      className="w-full text-left p-3 hover:bg-white/10 rounded transition-colors flex items-center"
                    >
                      <div className="mr-3">
                        <div className={`w-3 h-3 rounded-full ${info.accent}`}></div>
                      </div>
                      <span>{info.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-white/10 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">MusicStream</h2>
              <p className="text-white/70 text-sm">Streaming the best music for every mood</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 text-center text-white/70 text-sm">
            <p>© 2023 MusicStream. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}