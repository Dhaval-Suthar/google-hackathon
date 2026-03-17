"use client";

import { useTheme } from "@/app/providers/theme-provider";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Pause, Play, RotateCcw, Target, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TOTAL_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const STYLES = `
  @keyframes pulse-ring {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
  @keyframes glow {
    0%, 100% {
      filter: drop-shadow(0 0 20px #ff00a0);
    }
    50% {
      filter: drop-shadow(0 0 40px #ff00a0) drop-shadow(0 0 20px #ff00a0);
    }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  .bg-grid-light {
    background-size: 50px 50px;
    background-image:
      linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  }
  .bg-grid-dark {
    background-size: 50px 50px;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  }
`;

interface TimerState {
  isRunning: boolean;
  startTime: number | null;
  pausedTime: number | null;
  remainingTime: number;
}

export default function TimerPage() {
  const { isLightMode } = useTheme();
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    startTime: null,
    pausedTime: null,
    remainingTime: TOTAL_DURATION,
  });

  const broadcastChannel = useRef<BroadcastChannel | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BroadcastChannel for cross-tab synchronization
  useEffect(() => {
    if (typeof window !== "undefined") {
      broadcastChannel.current = new BroadcastChannel("hackathon-timer");

      // Listen for updates from other tabs
      broadcastChannel.current.onmessage = (event) => {
        const state = event.data as TimerState;
        setTimerState(state);
        localStorage.setItem("hackathon-timer-state", JSON.stringify(state));
      };

      // Load saved state from localStorage
      const savedState = localStorage.getItem("hackathon-timer-state");
      if (savedState) {
        const parsed = JSON.parse(savedState) as TimerState;
        setTimerState(parsed);
      }
    }

    return () => {
      broadcastChannel.current?.close();
    };
  }, []);

  // Update timer every 100ms when running
  useEffect(() => {
    if (timerState.isRunning && timerState.startTime) {
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - timerState.startTime!;
        const remaining = Math.max(0, TOTAL_DURATION - elapsed);

        setTimerState(prev => ({
          ...prev,
          remainingTime: remaining,
        }));

        // Auto-stop when time runs out
        if (remaining <= 0) {
          handlePause();
        }
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.startTime]);

  const broadcastState = (state: TimerState) => {
    broadcastChannel.current?.postMessage(state);
    localStorage.setItem("hackathon-timer-state", JSON.stringify(state));
  };

  const handleStart = () => {
    const newState: TimerState = {
      isRunning: true,
      startTime: timerState.pausedTime
        ? Date.now() - (TOTAL_DURATION - timerState.remainingTime)
        : Date.now(),
      pausedTime: null,
      remainingTime: timerState.remainingTime,
    };
    setTimerState(newState);
    broadcastState(newState);
  };

  const handlePause = () => {
    const newState: TimerState = {
      isRunning: false,
      startTime: timerState.startTime,
      pausedTime: Date.now(),
      remainingTime: timerState.remainingTime,
    };
    setTimerState(newState);
    broadcastState(newState);
  };

  const handleReset = () => {
    const newState: TimerState = {
      isRunning: false,
      startTime: null,
      pausedTime: null,
      remainingTime: TOTAL_DURATION,
    };
    setTimerState(newState);
    broadcastState(newState);
  };

  // Format time as HH:MM:SS:MS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: milliseconds.toString().padStart(2, "0"),
    };
  };

  const time = formatTime(timerState.remainingTime);
  const progress = ((TOTAL_DURATION - timerState.remainingTime) / TOTAL_DURATION) * 100;
  const timeElapsed = formatTime(TOTAL_DURATION - timerState.remainingTime);
  const percentComplete = progress.toFixed(1);

  const light = isLightMode;
  const textColor = light ? "text-slate-900" : "text-white";
  const mutedColor = light ? "text-slate-600" : "text-zinc-400";
  const bgColor = light ? "bg-slate-50" : "bg-[#050505]";
  const cardBg = light ? "bg-white" : "bg-[#0a0a0a]";
  const cardBorder = light ? "border-black" : "border-white/20";

  return (
    <div
      className={`relative font-sans selection:bg-[#ff00a0] selection:text-white transition-colors duration-500 min-h-screen ${bgColor} ${light ? "bg-grid-light" : "bg-grid-dark"}`}
    >
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-[120px] ${light ? "bg-pink-300/40" : "bg-pink-600/20"
            }`}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full blur-[120px] ${light ? "bg-purple-300/40" : "bg-purple-600/20"
            }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] ${light ? "bg-cyan-300/30" : "bg-cyan-600/15"
            }`}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 sm:mb-6"
          >
            <div
              className={`inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 border-[3px] ${light
                  ? "border-black bg-[#c0ff00] text-black"
                  : "border-[#c0ff00] bg-black text-[#c0ff00]"
                }`}
              style={{ boxShadow: light ? "6px 6px 0 #000" : "6px 6px 0 #c0ff00" }}
            >
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-black uppercase tracking-widest text-xs sm:text-sm">
                Live Countdown
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`font-black uppercase tracking-tighter text-4xl sm:text-5xl md:text-7xl lg:text-9xl ${textColor} mb-2 sm:mb-4`}
          >
            HACKATHON
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg sm:text-2xl md:text-4xl font-black uppercase tracking-wider ${mutedColor}`}
          >
            24 Hour Challenge
          </motion.div>
        </div>

        {/* Main Timer Section */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Left Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`${cardBg} border-[3px] ${cardBorder} p-4 sm:p-6 md:p-8`}
              style={{
                boxShadow: light
                  ? "6px 6px 0 #ff00a0"
                  : "6px 6px 0 rgba(255, 0, 160, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-[#ff00a0] rounded-lg">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <h3 className={`font-black text-base sm:text-lg md:text-xl uppercase ${textColor}`}>
                  Time Elapsed
                </h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black" style={{ color: "#ff00a0" }}>
                    {timeElapsed.hours}:{timeElapsed.minutes}
                  </div>
                  <div className={`text-xs sm:text-sm font-bold uppercase mt-2 ${mutedColor}`}>
                    Hours : Minutes
                  </div>
                </div>
                <div className="pt-3 sm:pt-4 border-t border-current opacity-20" />
                <div className="flex items-baseline gap-2">
                  <div className="text-2xl sm:text-3xl font-black" style={{ color: "#ff00a0" }}>
                    {percentComplete}%
                  </div>
                  <div className={`text-xs sm:text-sm font-bold ${mutedColor}`}>Complete</div>
                </div>
              </div>
            </motion.div>

            {/* Center Timer Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div
                className={`${cardBg} border-[3px] ${cardBorder} p-6 sm:p-8 md:p-10 relative overflow-hidden`}
                style={{
                  boxShadow: light
                    ? "8px 8px 0 #00f0ff"
                    : "8px 8px 0 rgba(0, 240, 255, 0.3)",
                }}
              >
                {/* Rotating background element */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full opacity-10"
                  style={{
                    background: `conic-gradient(from 0deg, #ff00a0, #00f0ff, #c0ff00, #ff00a0)`,
                    animation: "rotate-slow 20s linear infinite",
                  }}
                />

                <div className="relative z-10">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className={`text-[10px] sm:text-xs font-black uppercase tracking-wider ${mutedColor} mb-2`}>
                      Time Remaining
                    </div>
                    <div className="flex items-baseline justify-center gap-1 sm:gap-2">
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl md:text-6xl font-black" style={{ color: "#00f0ff" }}>
                          {time.hours}
                        </div>
                        <div className={`text-[9px] sm:text-[10px] font-bold uppercase ${mutedColor} mt-1`}>
                          Hours
                        </div>
                      </div>
                      <div className="text-3xl sm:text-4xl font-black" style={{ color: "#00f0ff" }}>:</div>
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl md:text-6xl font-black" style={{ color: "#00f0ff" }}>
                          {time.minutes}
                        </div>
                        <div className={`text-[9px] sm:text-[10px] font-bold uppercase ${mutedColor} mt-1`}>
                          Min
                        </div>
                      </div>
                      <div className="text-3xl sm:text-4xl font-black" style={{ color: "#00f0ff" }}>:</div>
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl md:text-6xl font-black" style={{ color: "#00f0ff" }}>
                          {time.seconds}
                        </div>
                        <div className={`text-[9px] sm:text-[10px] font-bold uppercase ${mutedColor} mt-1`}>
                          Sec
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 sm:mt-6">
                    <div className={`h-2 sm:h-3 ${light ? "bg-slate-200" : "bg-white/10"} rounded-full overflow-hidden`}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          width: `${100 - progress}%`,
                          background: "linear-gradient(90deg, #00f0ff, #ff00a0)",
                        }}
                        animate={{
                          opacity: timerState.isRunning ? [1, 0.8, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: timerState.isRunning ? Infinity : 0,
                        }}
                      />
                    </div>
                  </div>

                  {/* Milliseconds */}
                  <div className="text-center mt-3 sm:mt-4">
                    <span className="text-xl sm:text-2xl font-black tabular-nums" style={{ color: "#00f0ff", opacity: 0.5 }}>
                      .{time.milliseconds}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`${cardBg} border-[3px] ${cardBorder} p-4 sm:p-6 md:p-8`}
              style={{
                boxShadow: light
                  ? "6px 6px 0 #c0ff00"
                  : "6px 6px 0 rgba(192, 255, 0, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-[#c0ff00] rounded-lg">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <h3 className={`font-black text-base sm:text-lg md:text-xl uppercase ${textColor}`}>
                  Status
                </h3>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <AnimatePresence mode="wait">
                    {timerState.isRunning ? (
                      <motion.div
                        key="running"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <motion.div
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className={`text-xl sm:text-2xl font-black uppercase ${textColor}`}>
                          Running
                        </span>
                      </motion.div>
                    ) : timerState.remainingTime === TOTAL_DURATION ? (
                      <motion.div
                        key="ready"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500" />
                        <span className={`text-xl sm:text-2xl font-black uppercase ${textColor}`}>
                          Ready
                        </span>
                      </motion.div>
                    ) : timerState.remainingTime === 0 ? (
                      <motion.div
                        key="complete"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <div className="text-3xl sm:text-4xl mb-2">🎉</div>
                        <span className={`text-xl sm:text-2xl font-black uppercase ${textColor}`}>
                          Complete!
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="paused"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-500" />
                        <span className={`text-xl sm:text-2xl font-black uppercase ${textColor}`}>
                          Paused
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-current opacity-20" />

                <div>
                  <div className={`text-xs sm:text-sm font-bold uppercase mb-2 ${mutedColor}`}>
                    Sync Status
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className={`text-xs sm:text-sm font-bold ${textColor}`}>
                      All Tabs Synced
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
          >
            <AnimatePresence mode="wait">
              {!timerState.isRunning ? (
                <motion.button
                  key="start"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className={`group relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 font-black text-lg sm:text-xl md:text-2xl uppercase tracking-wider border-[3px] transition-all duration-300 ${light
                      ? "border-black bg-[#c0ff00] text-black hover:bg-[#d4ff33]"
                      : "border-[#c0ff00] bg-black text-[#c0ff00] hover:bg-[#0a0a0a]"
                    }`}
                  style={{
                    boxShadow: light ? "6px 6px 0 #ff00a0" : "6px 6px 0 rgba(255, 0, 160, 0.5)",
                  }}
                >
                  <Play className="inline-block mr-2 sm:mr-3" size={24} />
                  Start Timer
                </motion.button>
              ) : (
                <motion.button
                  key="pause"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePause}
                  className={`group relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 font-black text-lg sm:text-xl md:text-2xl uppercase tracking-wider border-[3px] transition-all duration-300 ${light
                      ? "border-black bg-[#ffcf00] text-black hover:bg-[#ffe033]"
                      : "border-[#ffcf00] bg-black text-[#ffcf00] hover:bg-[#0a0a0a]"
                    }`}
                  style={{
                    boxShadow: light ? "6px 6px 0 #ff00a0" : "6px 6px 0 rgba(255, 0, 160, 0.5)",
                  }}
                >
                  <Pause className="inline-block mr-2 sm:mr-3" size={24} />
                  Pause Timer
                </motion.button>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className={`group relative px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 font-black text-lg sm:text-xl md:text-2xl uppercase tracking-wider border-[3px] transition-all duration-300 ${light
                  ? "border-black bg-white text-black hover:bg-slate-100"
                  : "border-white/50 bg-black text-white hover:bg-[#0a0a0a]"
                }`}
              style={{
                boxShadow: light ? "6px 6px 0 #64748b" : "6px 6px 0 rgba(255, 255, 255, 0.2)",
              }}
            >
              <RotateCcw className="inline-block mr-2 sm:mr-3" size={24} />
              Reset
            </motion.button>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 sm:mt-12 text-center"
          >
            <div
              className={`inline-block px-4 py-3 sm:px-6 sm:py-4 border-[3px] ${cardBorder} ${cardBg}`}
              style={{
                boxShadow: light ? "4px 4px 0 rgba(0,0,0,0.1)" : "4px 4px 0 rgba(255,255,255,0.05)",
              }}
            >
              <p className={`text-xs sm:text-sm font-bold ${mutedColor} flex items-center gap-2 flex-wrap justify-center`}>
                <span>⚡</span>
                <span className="uppercase tracking-wider">
                  Timer automatically syncs across all browser tabs
                </span>
                <span>⚡</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
