import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TextsService } from './texts.service';
import { CreateTextDto } from './dto/create-text.dto';
import { UpdateTextDto } from './dto/update-text.dto';
import { ParseObjectIdPipe } from 'src/utils/parse-object-id-pipe.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { Languages } from 'src/constants/constants';

@Controller('texts')
export class TextsController {
  constructor(private readonly textsService: TextsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createTextDto: CreateTextDto) {
    return this.textsService.create(createTextDto);
  }

  @Get()
  findAll() {
    return this.textsService.findAll();
  }

  @Get('by-id/:id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.textsService.findOne(id);
  }

  @Get('by-section/:section')
  findOneBySection(@Param('section') section: string) {
    return this.textsService.findOneBySection(section);
  }

  @Get('products-services-titles/:language')
  getProductsServicesTitlesByLanguage(
    @Param('language') language: Languages,
  ) {
    return this.textsService.getProductsServicesTitlesByLanguage(language);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateTextDto: UpdateTextDto,
  ) {
    return this.textsService.update(id, updateTextDto);
  }
}
