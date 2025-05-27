import { Request, Response } from 'express';
import Content from '../models/Content';

export const getContents = async (req: Request, res: Response) => {
  try {
    const contents = await Content.find()
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: '获取内容列表失败', error });
  }
};

export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, body, tags } = req.body;
    const content = new Content({
      title,
      body,
      tags,
      author: req.body.authorId, // 在实际应用中，这应该从认证中间件获取
    });
    const savedContent = await content.save();
    const populatedContent = await Content.findById(savedContent._id)
      .populate('author', 'username avatar');
    res.status(201).json({ message: '内容创建成功', content: populatedContent });
  } catch (error) {
    res.status(400).json({ message: '创建内容失败', error });
  }
};

export const likeContent = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;
    const { userId } = req.body;
    
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: '内容不存在' });
    }
    
    const hasLiked = content.likes.includes(userId);
    if (hasLiked) {
      content.likes = content.likes.filter(id => id.toString() !== userId);
    } else {
      content.likes.push(userId);
    }
    
    await content.save();
    res.json({ message: hasLiked ? '取消点赞' : '点赞成功', likesCount: content.likes.length });
  } catch (error) {
    res.status(500).json({ message: '点赞操作失败', error });
  }
};
