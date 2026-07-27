import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

const REGISTRATION_NUMBER_PATTERN = /^\d{8}$/;

@Injectable()
export class RegistrationNumberPipe implements PipeTransform<string, string> {
    transform(value: string): string {
        const registrationNumber = value?.trim();

        if (!registrationNumber) {
            throw new BadRequestException('SBD không được để trống');
        }

        if (!REGISTRATION_NUMBER_PATTERN.test(registrationNumber)) {
            throw new BadRequestException('SBD không hợp lệ');
        }

        return registrationNumber;
    }
}