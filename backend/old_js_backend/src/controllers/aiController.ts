import { Request, Response } from 'express';
import { askAI } from '../services/aiService';

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { question, context } = req.body;
    if (!question) {
      return res.status(400).json({ message: '请提供问题内容' });
    }
    
    const answer = await askAI(question);
    res.json({
      question,
      answer,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: 'AI助手响应失败', error });
  }
};

export const getStudyPlan = async (req: Request, res: Response) => {
  try {
    const { subject, level, goals } = req.body;
    const prompt = `为${level}水平的学习者制定${subject}学习计划，目标：${goals}`;
    
    const plan = await askAI(prompt);
    res.json({
      subject,
      level,
      goals,
      plan,
      createdAt: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: '生成学习计划失败', error });
  }
};
