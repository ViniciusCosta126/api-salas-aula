import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const newRoom = roomRepository.create({
        name,
        description,
      });
      await roomRepository.save(newRoom);
      return res
        .status(201)
        .json({ message: "Criado com sucesso!", room: newRoom });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;

    try {
      const room = await roomRepository.findOneBy({ id: Number(idRoom) });

      if (!room) {
        return res.status(404).json({ message: "Aula não encontrada" });
      }

      const newVideo = videoRepository.create({
        title,
        url,
        room,
      });
      await videoRepository.save(newVideo);
      return res
        .status(201)
        .json({ message: "Criado com sucesso!", video: newVideo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
