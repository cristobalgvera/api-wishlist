import { TestBed } from '@automock/jest';
import { Environment, EnvironmentService } from '@core/environment';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let underTest: DatabaseService;
  let environmentService: EnvironmentService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(DatabaseService).compile();

    underTest = unit;
    environmentService = unitRef.get(EnvironmentService);
  });

  describe('createTypeOrmOptions', () => {
    const environment = {
      DB_HOST: 'DB_HOST',
      DB_NAME: 'DB_NAME',
      DB_SSL_CA: 'DB_SSL_CA',
      DB_PASSWORD: 'DB_PASSWORD',
      DB_PORT: 1234,
      DB_USERNAME: 'DB_USERNAME',
    } as Readonly<Environment>;

    beforeEach(() => {
      jest
        .spyOn(environmentService, 'get')
        .mockImplementation((key) => environment[key]);
    });

    it('should contain the credential properties', () => {
      const expected: TypeOrmModuleOptions = {
        port: environment.DB_PORT,
        host: environment.DB_HOST,
        username: environment.DB_USERNAME,
        password: environment.DB_PASSWORD,
        database: environment.DB_NAME,
      };

      const actual = underTest.createTypeOrmOptions();

      expect(actual).toMatchObject<TypeOrmModuleOptions>(expected);
    });

    it('should contain some extra helper properties', () => {
      const expectedDefinedProperties: Array<keyof TypeOrmModuleOptions> = [
        'type',
        'migrationsTableName',
      ];

      const expected: TypeOrmModuleOptions = {
        autoLoadEntities: true,
        migrations: ['dist/**/migrations/*.js'],
        migrationsRun: true,
      };

      const actual = underTest.createTypeOrmOptions();

      expect(actual).toMatchObject<TypeOrmModuleOptions>(expected);
      expectedDefinedProperties.forEach(expect(actual).toHaveProperty);
    });

    it('should not contain some helper properties', () => {
      const nonExpectedProperties: Array<keyof TypeOrmModuleOptions> = [
        'synchronize',
      ];

      const actual = underTest.createTypeOrmOptions();

      nonExpectedProperties.forEach(expect(actual).not.toHaveProperty);
    });

    describe('when is in production mode', () => {
      beforeEach(() => {
        jest.spyOn(environmentService, 'isProd').mockReturnValue(true);
      });

      it('should contain extra connection properties', () => {
        const expected: TypeOrmModuleOptions = {
          ssl: { ca: environment.DB_SSL_CA },
        };

        const actual = underTest.createTypeOrmOptions();

        expect(actual).toMatchObject<TypeOrmModuleOptions>(expected);
      });
    });

    describe('when is not in production mode', () => {
      beforeEach(() => {
        jest.spyOn(environmentService, 'isProd').mockReturnValue(false);
      });

      it('should contain extra connection properties', () => {
        const expected: TypeOrmModuleOptions = {
          host: environment.DB_HOST,
        };

        const actual = underTest.createTypeOrmOptions();

        expect(actual).toMatchObject<TypeOrmModuleOptions>(expected);
      });

      it('should not contain some connection properties as undefined', () => {
        const nonExpectedProperties: ReadonlyArray<
          keyof MysqlConnectionOptions
        > = ['ssl'];

        const actual = underTest.createTypeOrmOptions();

        nonExpectedProperties.forEach(expect(actual).not.toHaveProperty);
      });
    });
  });
});
