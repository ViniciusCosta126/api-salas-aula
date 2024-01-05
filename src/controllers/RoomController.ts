import { Request, Response } from "express";
import { roomRepository } from "../repositories/roomRepository";
import { videoRepository } from "../repositories/videoRepository";
import { subjectRepository } from "../repositories/subjectRepository";
import { NotFoundError } from "../helpers/api-errors";

export class RoomController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const newRoom = roomRepository.create({
      name,
      description,
    });
    await roomRepository.save(newRoom);
    return res
      .status(201)
      .json({ message: "Criado com sucesso!", room: newRoom });
  }

  async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { idRoom } = req.params;
    const room = await roomRepository.findOneBy({ id: Number(idRoom) });

    if (!room) {
      throw new NotFoundError("Aula não existe!!");
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
  }

  async roomSubject(req: Request, res: Response) {
    const { subject_id } = req.body;
    const { idRoom } = req.params;

    const room = await roomRepository.findOneBy({ id: Number(idRoom) });

    if (!room) {
      throw new NotFoundError("Aula não encontrada");
    }

    const subject = await subjectRepository.findOneBy({
      id: Number(subject_id),
    });

    if (!subject) {
      throw new NotFoundError("Disciplina não encontrada");
    }

    const roomUpdate = {
      ...room,
      subjects: [subject],
    };

    await roomRepository.save(roomUpdate);

    return res.status(204).send();
  }

  async list(req: Request, res: Response) {
    const rooms = await roomRepository.find({
      relations: {
        subjects: true,
        videos: true,
      },
    });
    return res.json(rooms);
  }
}
