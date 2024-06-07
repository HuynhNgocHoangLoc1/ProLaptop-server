import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ValidationPipe, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { GetReviewDto } from './dto/get-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }


  @Get()
  async findAll(@Query() params: GetReviewDto) {
    return this.reviewService.findAll(params);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.reviewService.findOneById(id);
  }


  
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateReviewDto: UpdateReviewDto,
  ) {
    const result = await this.reviewService.update(id, updateReviewDto);
    return { result, message: 'Successfully update review' };
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
  return this.reviewService.remove(id);
  }
}
