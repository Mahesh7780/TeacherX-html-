import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Download, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Repeat,
  Languages,
  FileText,
  Mic,
  MicOff,
  PenTool,
  Type,
  Eraser,
  Undo,
  Redo,
  Trash2,
  Download as DownloadIcon,
  Lightbulb,
  Moon,
  Sun,
  CheckCircle,
  Circle,
  Clock,
  Brain,
  Code,
  Palette,
  FileText as FileTextIcon,
  Volume2,
  VolumeX,
  HelpCircle,
  Sparkles
} from 'lucide-react';

const StudyingPage = () => {
  // State management
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [classStatus, setClassStatus] = useState('idle'); // idle, active, paused, ended
  const [selectedTab, setSelectedTab] = useState('ai-teaching');
  const [timer, setTimer] = useState(0);
  const [timerPreset, setTimerPreset] = useState(45);
  const [progress, setProgress] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [notes, setNotes] = useState('');
  const [homework, setHomework] = useState([]);
  const [aiMessage, setAiMessage] = useState('Welcome to your Python lesson! Today we\'ll learn about variables and data types. Let\'s start with the basics.');
  const [code, setCode] = useState(`# Welcome to Python!
# Let's start with variables

name = "Student"
age = 18
is_student = True

print(f"Hello {name}, you are {age} years old!")
print(f"Are you a student? {is_student}")

# Try changing the values above and run the code!`);
  const [codeOutput, setCodeOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [whiteboardMode, setWhiteboardMode] = useState('pen');
  const [whiteboardHistory, setWhiteboardHistory] = useState([]);
  const [currentDrawing, setCurrentDrawing] = useState([]);

  // Refs
  const canvasRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Timer effect
  useEffect(() => {
    if (classStatus === 'active') {
      timerIntervalRef.current = setInterval(() => {
        setTimer(prev => {
          const newTimer = prev + 1;
          const progressPercent = Math.min((newTimer / (timerPreset * 60)) * 100, 100);
          setProgress(progressPercent);
          return newTimer;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [classStatus, timerPreset]);

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Class controls
  const startClass = () => {
    setClassStatus('active');
    setTimer(0);
    setProgress(0);
  };

  const pauseClass = () => {
    setClassStatus('paused');
  };

  const resumeClass = () => {
    setClassStatus('active');
  };

  const endClass = () => {
    setClassStatus('ended');
    clearInterval(timerIntervalRef.current);
  };

  const restartClass = () => {
    setClassStatus('idle');
    setTimer(0);
    setProgress(0);
    setCurrentLesson(1);
  };

  // AI Teaching functions
  const askDoubt = () => {
    setAiMessage('Great question! Let me explain that in more detail. Variables in Python are like containers that store data. When you write "name = John", you\'re creating a variable called "name" and storing the value "John" in it.');
  };

  const repeatExplanation = () => {
    setAiMessage('Let me repeat: Variables are containers for storing data values. In Python, you don\'t need to declare the type of variable. Python figures it out automatically!');
  };

  const translateToHindi = () => {
    setAiMessage('चलिए हिंदी में समझते हैं: Python में variables डेटा स्टोर करने के लिए containers होते हैं। जब आप "name = John" लिखते हैं, तो आप एक variable बना रहे हैं जिसमें "John" की value store होती है।');
  };

  const summarize = () => {
    setAiMessage('Summary: Variables store data, Python is dynamically typed, and you can use variables to make your code more readable and reusable.');
  };

  const aiDraw = () => {
    setAiMessage('Let me draw a diagram to explain variables and data types visually!');
    setSelectedTab('whiteboard');
    // Simulate AI drawing after a delay
    setTimeout(() => {
      setCurrentDrawing([
        { type: 'diagram', content: 'variables-diagram' }
      ]);
    }, 1000);
  };

  const aiCode = () => {
    setAiMessage('Let me show you some practical code examples to demonstrate these concepts!');
    setSelectedTab('coding');
    // AI writes new code examples
    const aiCodeExamples = `# AI Teacher's Code Examples
# Let's explore different data types in Python

# 1. String Variables
student_name = "Emily"
course = "Python Programming"
print(f"Student: {student_name}")
print(f"Course: {course}")

# 2. Numeric Variables
age = 18
score = 95.5
print(f"Age: {age} (integer)")
print(f"Score: {score} (float)")

# 3. Boolean Variables
is_enrolled = True
has_completed = False
print(f"Enrolled: {is_enrolled}")
print(f"Completed: {has_completed}")

# 4. List Variables (collections)
subjects = ["Math", "Physics", "Programming"]
grades = [85, 92, 88]
print(f"Subjects: {subjects}")
print(f"Grades: {grades}")

# 5. Dictionary Variables (key-value pairs)
student_info = {
    "name": "Emily",
    "age": 18,
    "courses": ["Python", "Calculus"]
}
print(f"Student Info: {student_info}")

# Let's run this to see the output!`;
    
    setCode(aiCodeExamples);
    
    // Simulate AI running the code
    setTimeout(() => {
      setCodeOutput(`Student: Emily
Course: Python Programming
Age: 18 (integer)
Score: 95.5 (float)
Enrolled: True
Completed: False
Subjects: ['Math', 'Physics', 'Programming']
Grades: [85, 92, 88]
Student Info: {'name': 'Emily', 'age': 18, 'courses': ['Python', 'Calculus']}

✅ Code executed successfully by AI Teacher!
💡 Notice how different data types are handled automatically by Python.`);
    }, 1500);
  };

  // Code execution simulation
  const runCode = () => {
    setCodeOutput('Hello Student, you are 18 years old!\nAre you a student? True\n\nCode executed successfully!');
  };

  const resetCode = () => {
    setCode(`# Welcome to Python!
# Let's start with variables

name = "Student"
age = 18
is_student = True

print(f"Hello {name}, you are {age} years old!")
print(f"Are you a student? {is_student}")

# Try changing the values above and run the code!`);
    setCodeOutput('');
  };

  // Whiteboard functions
  const clearWhiteboard = () => {
    setCurrentDrawing([]);
    setWhiteboardHistory([]);
  };

  const undoWhiteboard = () => {
    if (currentDrawing.length > 0) {
      setCurrentDrawing(prev => prev.slice(0, -1));
    }
  };

  const redoWhiteboard = () => {
    // Implementation for redo functionality
  };

  const exportWhiteboard = () => {
    // Implementation for exporting whiteboard as PNG
    alert('Whiteboard exported as PNG!');
  };

  // Homework functions
  const addHomeworkItem = (text) => {
    setHomework(prev => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleHomeworkItem = (id) => {
    setHomework(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const generateHomework = () => {
    const newHomework = [
      'Create a variable called "favorite_color" and assign your favorite color to it',
      'Write a program that prints your name and age using variables',
      'Practice using different data types: string, integer, and boolean'
    ];
    setHomework(newHomework.map((text, index) => ({ id: index, text, completed: false })));
  };

  // Lesson steps
  const lessonSteps = [
    { id: 1, title: 'Introduction to Variables', completed: currentLesson >= 1 },
    { id: 2, title: 'Data Types in Python', completed: currentLesson >= 2 },
    { id: 3, title: 'Working with Strings', completed: currentLesson >= 3 },
    { id: 4, title: 'Practice Exercises', completed: currentLesson >= 4 }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Action Bar */}
      <div className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              TeacherX - Studying Session
            </h1>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {formatTime(timer)}
              </span>
              <div className={`w-2 h-2 rounded-full ${classStatus === 'active' ? 'bg-green-500' : classStatus === 'paused' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {classStatus === 'idle' && (
              <button
                onClick={startClass}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play size={16} />
                <span>Start Class</span>
              </button>
            )}

            {classStatus === 'active' && (
              <button
                onClick={pauseClass}
                className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Pause size={16} />
                <span>Pause</span>
              </button>
            )}

            {classStatus === 'paused' && (
              <button
                onClick={resumeClass}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play size={16} />
                <span>Resume</span>
              </button>
            )}

            {(classStatus === 'active' || classStatus === 'paused') && (
              <button
                onClick={endClass}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Square size={16} />
                <span>End Class</span>
              </button>
            )}

            {classStatus === 'ended' && (
              <button
                onClick={restartClass}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RotateCcw size={16} />
                <span>Restart</span>
              </button>
            )}

            <button
              onClick={() => {/* Download notes */}}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download size={16} />
              <span>Download Notes</span>
            </button>

            <button
              onClick={() => {/* View homework */}}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <BookOpen size={16} />
              <span>View Homework</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className={`${isSidebarCollapsed ? 'w-16' : 'w-80'} ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-all duration-300 flex flex-col`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              {!isSidebarCollapsed && (
                <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Intro to Python
                </h2>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>
          </div>

          {!isSidebarCollapsed && (
            <>
              {/* Timer and Progress */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Class Timer
                  </span>
                  <div className="flex space-x-1">
                    {[30, 45, 60].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setTimerPreset(preset)}
                        className={`px-2 py-1 text-xs rounded ${
                          timerPreset === preset
                            ? 'bg-blue-600 text-white'
                            : isDarkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {preset}m
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {Math.round(progress)}% complete
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatTime(timer)} / {timerPreset}:00
                  </span>
                </div>
              </div>

              {/* Lesson Steps */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Lesson Steps
                </h3>
                <div className="space-y-2">
                  {lessonSteps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-2 p-2 rounded-lg ${
                        step.completed
                          ? isDarkMode
                            ? 'bg-green-900 text-green-300'
                            : 'bg-green-100 text-green-800'
                          : isDarkMode
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <Circle size={16} />
                      )}
                      <span className="text-sm">{step.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Notes */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-1">
                <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Quick Notes
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Take notes here..."
                  className={`w-full h-32 p-3 text-sm rounded-lg border resize-none ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Homework Checklist */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Homework
                  </h3>
                  <button
                    onClick={generateHomework}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Generate
                  </button>
                </div>
                <div className="space-y-2">
                  {homework.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleHomeworkItem(item.id)}
                        className="rounded"
                      />
                      <span className={`text-sm ${item.completed ? 'line-through opacity-50' : ''} ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="p-4">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`flex items-center space-x-2 w-full p-2 rounded-lg ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Main Teaching Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Navigation */}
          <div className={`border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex space-x-1 p-4">
              {[
                { id: 'ai-teaching', label: 'AI Teaching', icon: Brain },
                { id: 'coding', label: 'Live Coding', icon: Code },
                { id: 'whiteboard', label: 'Whiteboard', icon: Palette },
                { id: 'summary', label: 'Summary & Notes', icon: FileTextIcon }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {selectedTab === 'ai-teaching' && (
              <div className={`h-full p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                  {/* AI Teacher */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Sparkles size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        AI Tutor
                      </h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Python Expert • Online
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-auto">
                      <button
                        onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                        className={`p-2 rounded-lg ${
                          isVoiceEnabled
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                      </button>
                      <button
                        onClick={() => setIsMicEnabled(!isMicEnabled)}
                        className={`p-2 rounded-lg ${
                          isMicEnabled
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isMicEnabled ? <Mic size={16} /> : <MicOff size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* AI Message */}
                  <div className={`p-4 rounded-lg mb-6 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}>
                    <p className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      {aiMessage}
                    </p>
                  </div>

                  {/* AI Controls */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={askDoubt}
                      className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <HelpCircle size={16} />
                      <span>Ask Doubt</span>
                    </button>
                    <button
                      onClick={repeatExplanation}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Repeat size={16} />
                      <span>Repeat</span>
                    </button>
                    <button
                      onClick={translateToHindi}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Languages size={16} />
                      <span>Translate</span>
                    </button>
                    <button
                      onClick={summarize}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <FileText size={16} />
                      <span>Summarize</span>
                    </button>
                    <button
                      onClick={aiDraw}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <PenTool size={16} />
                      <span>AI Draw</span>
                    </button>
                    <button
                      onClick={aiCode}
                      className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Code size={16} />
                      <span>AI Code</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'coding' && (
              <div className={`h-full p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className={`max-w-6xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                  {/* Editor Header */}
                  <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center space-x-4">
                      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Live Code Editor
                      </h3>
                      <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className={`px-3 py-1 rounded border ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={runCode}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Play size={16} />
                        <span>Run</span>
                      </button>
                      <button
                        onClick={resetCode}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <RotateCcw size={16} />
                        <span>Reset</span>
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(code)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <DownloadIcon size={16} />
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Editor */}
                  <div className="flex h-96">
                    <div className="flex-1">
                      <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={`w-full h-full p-4 font-mono text-sm resize-none ${
                          isDarkMode
                            ? 'bg-gray-900 text-gray-100 border-gray-700'
                            : 'bg-gray-50 text-gray-900 border-gray-300'
                        } border-r focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder="Write your code here..."
                      />
                    </div>
                    <div className="w-1/3">
                      <div className={`h-full p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Output
                        </h4>
                        <pre className={`text-sm font-mono whitespace-pre-wrap ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {codeOutput || 'Run your code to see the output here...'}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'whiteboard' && (
              <div className={`h-full p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className={`max-w-6xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                  {/* Whiteboard Header */}
                  <div className={`flex items-center justify-between p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Interactive Whiteboard
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setWhiteboardMode('pen')}
                        className={`p-2 rounded-lg ${
                          whiteboardMode === 'pen'
                            ? 'bg-blue-600 text-white'
                            : isDarkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        <PenTool size={16} />
                      </button>
                      <button
                        onClick={() => setWhiteboardMode('text')}
                        className={`p-2 rounded-lg ${
                          whiteboardMode === 'text'
                            ? 'bg-blue-600 text-white'
                            : isDarkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        <Type size={16} />
                      </button>
                      <button
                        onClick={() => setWhiteboardMode('eraser')}
                        className={`p-2 rounded-lg ${
                          whiteboardMode === 'eraser'
                            ? 'bg-blue-600 text-white'
                            : isDarkMode
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        <Eraser size={16} />
                      </button>
                      <div className="w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
                      <button
                        onClick={undoWhiteboard}
                        className={`p-2 rounded-lg ${
                          isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <Undo size={16} />
                      </button>
                      <button
                        onClick={redoWhiteboard}
                        className={`p-2 rounded-lg ${
                          isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <Redo size={16} />
                      </button>
                      <button
                        onClick={clearWhiteboard}
                        className={`p-2 rounded-lg ${
                          isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={exportWhiteboard}
                        className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <DownloadIcon size={16} />
                        <span>Export PNG</span>
                      </button>
                    </div>
                  </div>

                  {/* Whiteboard Canvas */}
                  <div className="h-96 bg-white border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <Palette size={48} className="text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Whiteboard canvas area</p>
                      <p className="text-sm text-gray-400">Click and drag to draw • Use tools above to switch modes</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'summary' && (
              <div className={`h-full p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
                  <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Class Summary & Notes
                  </h3>

                  {/* Summary */}
                  <div className="mb-8">
                    <h4 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Today's Lesson Summary
                    </h4>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                      <ul className={`space-y-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        <li>• Variables are containers for storing data values</li>
                        <li>• Python is dynamically typed - no need to declare variable types</li>
                        <li>• Common data types: strings, integers, floats, booleans</li>
                        <li>• Use meaningful variable names for better code readability</li>
                        <li>• Variables can be reassigned with new values</li>
                      </ul>
                    </div>
                  </div>

                  {/* Key Concepts */}
                  <div className="mb-8">
                    <h4 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Key Concepts
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Variables', desc: 'Containers for storing data' },
                        { title: 'Data Types', desc: 'Different kinds of data (string, int, bool)' },
                        { title: 'Assignment', desc: 'Using = to assign values to variables' },
                        { title: 'Print Function', desc: 'Displaying output to the console' }
                      ].map((concept, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <h5 className={`font-medium mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {concept.title}
                          </h5>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {concept.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Homework Section */}
                  <div>
                    <h4 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Homework Assignment
                    </h4>
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                      <p className={`mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Complete the following exercises to practice what you learned:
                      </p>
                      <ol className={`space-y-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        <li>1. Create variables for your name, age, and favorite hobby</li>
                        <li>2. Write a program that calculates the area of a rectangle</li>
                        <li>3. Practice using different data types in your code</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyingPage; 