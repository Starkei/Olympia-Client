import { Injectable } from "@angular/core";
import { Training } from "../../interfaces/training";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  training: Array<Training> = [];
  constructor() {
    this.training.push({
      title: "Арт-терапия. Сказку мы творим своими руками.",
      description:
        "Арт-терапия способствует формированию здоровой и творческой личности. Кроме того, арт-терапия является ещё и развивающим методом: через творческий процесс происходит пробуждение души, самовыражение своего истинного «Я» и, в результате, нахождение человеком оптимальных способов решения собственных проблемМетоды арт-терапии дают возможность относительно безболезненного доступа к глубинному психологическому материалу, стимулируют проработку бессознательных переживаний, обеспечивая дополнительную защищённость и снижая сопротивление изменениям. На занятии по арт-терапии мы сочиним собственную сказку, в которой будут главные и второстепенные персонажи, начало развития истории, кульминация, преодоление трудностей и счастливый финал",
      price: 100,
      address: " Минск,Фрунзенский район, 2-й пер Тимошенко, 3",
      leader: "Янина Коновко",
      image:
        "http://www.e-event.kz/wp-content/uploads/2017/03/16996003_1367484669984147_4774523484823776271_n.jpg"
    });
    this.training.push({
      title: "Психолог. Консультация, психологическая помощь.",
      description:
        "Мы хотим быть счастливыми, свободными и независимыми, хотим достигать своих целей и получить радость от жизни, хотим быть уверенными и спокойными в принятии сложных решений, хотим раскрыть свою индивидуальность и понять, кто мы и зачем пришли в этот мир. Принятие себя, осознание своих целей происходит не сразу. Именно психолог может сделать этот процесс быстрым и эффективным. Ведь развитие, как правило, сопровождается болезненными переживаниями и проблемами, которые мы должны решать, чтобы стать лучше.Мы будем рады помочь Вам! Мы — команда профессионалов с многолетним успешным опытом работы.Помощь психолога нужна в том случае, если Вы хотите улучшить качество собственной жизни, раскрыть свою индивидуальность, избавиться от психологических комплексов и затруднений.",
      price: 200,
      address: "Минск,Фрунзенский район, 2-й пер Тимошенко, 3",
      leader: "Елена Дубовик",
      image:
        "http://www.e-event.kz/wp-content/uploads/2017/03/16996003_1367484669984147_4774523484823776271_n.jpg"
    });
  }

  getTraining(): Array<Training> {
    return this.training;
  }
}
