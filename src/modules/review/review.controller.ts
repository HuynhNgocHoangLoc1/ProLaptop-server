import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

 
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }


  @Get()
  async findAll() {
    const reviews = await this.reviewService.findAll();
    return { reviews, message: 'Successfully fetched all reviews' };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const review = await this.reviewService.findOne(id);
    if (review) {
      return { review, message: 'Successfully fetched review' };
    } else {
      return { message: `review with ID ${id} not found` };
    }
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
    const result = await this.reviewService.remove(id);
    return result;
  }
}
