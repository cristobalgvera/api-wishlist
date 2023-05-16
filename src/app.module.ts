import { DatabaseModule } from '@core/database';
import { EnvironmentModule } from '@core/environment';
import { WishListModule } from '@features/wish-list';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [EnvironmentModule, DatabaseModule, WishListModule],
  providers: [Logger],
})
export class AppModule {}
