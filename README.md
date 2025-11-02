🧠 NETRA: AI-Powered Traffic Optimization System

Netra is an AI + Reinforcement Learning based intelligent traffic optimization and monitoring system designed for Indian cities.
It provides real-time traffic control, incident detection, and data-driven decision-making to reduce congestion and improve emergency response times.

🚦 Problem Statement

India’s traffic congestion leads to long commute times, high fuel consumption, and increased pollution.
Traditional traffic light systems are static, unable to adapt to dynamic traffic conditions — especially during peak hours or emergencies.

Netra addresses this by using real-time video analytics and AI-driven adaptive control to optimize traffic flow and prioritize emergency vehicles.

🎯 Objectives

Implement an AI + RL-based adaptive traffic control system

Provide real-time traffic density and incident monitoring via live video feeds

Develop a centralized web dashboard for traffic authorities

Reduce average waiting time and congestion levels by intelligent signal optimization

🧩 Features

✅ Real-time traffic video analysis (via CCTV/IoT cameras)
✅ Reinforcement learning model for adaptive signal timing
✅ Priority routing for emergency vehicles
✅ Web dashboard for live monitoring and analytics
✅ Traffic heatmaps and congestion prediction
✅ Scalable backend with API integration for smart cities

🧠 Tech Stack
Layer	Technologies
Frontend	React.js / Next.js, Tailwind CSS, Chart.js / Recharts
Backend	Node.js / Express.js
AI / ML	Python, TensorFlow / PyTorch, OpenCV, Reinforcement Learning (Q-learning / DQN)
Database	MongoDB / Firebase
Hosting / Deployment	Vercel / Render / AWS
Other Tools	Figma (UI Design), GitHub, Google Colab
⚙️ System Architecture

Input Layer: Real-time traffic video or image stream

Processing Layer: AI models for object detection & density estimation

RL Agent: Decides optimal signal timing based on live data

Dashboard: Visualizes traffic flow and allows manual control if needed

💡 How to Run Locally
# Clone the repository
git clone https://github.com/yourusername/netra.git

# Navigate to project directory
cd netra

# Install dependencies
npm install

# Run the frontend
npm start


📊 Results & Key Metrics

Reduced average waiting time by 30–40% during peak hours (simulation)

Improved signal efficiency using Deep Q-Learning

Adaptive system capable of handling real-time anomalies and emergencies


🚀 Future Enhancements

Integration with IoT sensors and drone-based traffic surveillance

Predictive modeling for accidents and road blockages

Mobile app for citizens to report congestion

Integration with government Smart City APIs

