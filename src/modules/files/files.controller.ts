import { Controller, UseInterceptors, Post, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { FilesService } from "./files.service";

import { FileElementResponese } from "./dto/file-element.dto";

import { MFile } from "./mfile.class";

@Controller("files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponese[]> {
    const saveArray: MFile[] = [new MFile(file)];

    if (file.mimetype.includes("image")) {
      const buffer = await this.filesService.convertToWebp(file.buffer);

      saveArray.push(
        new MFile({
          originalname: `${file.originalname.split(".")[0]}.webp`,
          buffer,
        }),
      );
    }

    return this.filesService.saveFiles(saveArray);
  }
}
