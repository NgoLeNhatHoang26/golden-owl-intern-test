import { Injectable, NotFoundException} from "@nestjs/common";
import { BaseSubject } from "./models/base-subject.model";
import { ISubject } from "./interface/subject.interface";


@Injectable()
export class SubjectRegistry {
    private readonly subjects: BaseSubject[];
    private readonly subjectMap: Map<string, BaseSubject>;

    constructor() {
        this.subjects = [
          new BaseSubject('math', 'Toán', 'toan', 'math'),
          new BaseSubject('literature', 'Ngữ văn', 'ngu_van', 'literature'),
          new BaseSubject('foreignLanguage', 'Ngoại ngữ', 'ngoai_ngu', 'foreign_language'),
          new BaseSubject('physics', 'Vật lí', 'vat_li', 'physics'),
          new BaseSubject('chemistry', 'Hóa học', 'hoa_hoc', 'chemistry'),
          new BaseSubject('biology', 'Sinh học', 'sinh_hoc', 'biology'),
          new BaseSubject('history', 'Lịch sử', 'lich_su', 'history'),
          new BaseSubject('geography', 'Địa lí', 'dia_li', 'geography'),
          new BaseSubject('civicEducation', 'GDCD', 'gdcd', 'civic_education'),
        ];
        this.subjectMap = new Map(this.subjects.map(subject => [subject.code, subject]));
    }
    getAll(): ISubject[] {
        return this.subjects;
      }
    getByCode(code: string): ISubject {
        const subject = this.subjectMap.get(code);
        if (!subject) {
          throw new NotFoundException(`Không tìm thấy môn học: ${code}`);
        }
        return subject;
    }
    getGroupA(): ISubject[] {
        return ['math', 'physics', 'chemistry'].map(code => this.getByCode(code));
    }
}