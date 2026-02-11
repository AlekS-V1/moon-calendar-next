import { getSingleMoonday } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

const MoonDayDetails = async ({ params }: Props) => {
  const { id } = await params;
  const resDay = await getSingleMoonday(id);

  const aspectTitles: Record<string, string> = {
    newActivities: "Нові справи",
    decisionMaking: "Приняття рішень",
    business: "Бізнес",
    money: "Гроші",
    realEstate: "Нерухомість",
    trade: "Торгівля",
    legalMatters: "Судові справи",
    science: "Наука",
    art: "Мистецтво",
    creativity: "Творчість",
    learningExams: "Навчання, іспити",
    communication: "Комунікація",
    confrontation: "Протистояння",
    bossCommunication: "Спілкування з начальством",
    jobChange: "Зміна місця роботи",
    travel: "Подорожі, ділові поїздки",
    movement: "Рухаємося",
    rest: "Відпочинок",
    physicalActivity: "Фізична активність",
    housework: "Домашнє завдання",
    marriage: "Шлюб",
    intimacy: "Сімейна близькість",
    conception: "Зачаття",
  };

  return (
    <div>
      <h2>{resDay.dayNumber} Місячний день</h2>
      <h4>{resDay.phase}</h4>
      <p>{resDay.phaseDescription}</p>

      <h3>Загальне значення</h3>
      <p>{resDay.generalMeaning}</p>

      <h3>Якості</h3>
      <ul>
        {resDay.qualities.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>

      <h3>Попередження</h3>
      <ul>
        {resDay.warnings.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>

      <h3>Символи</h3>
      <ul>
        {resDay.symbols.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <h3>Камені</h3>
      <ul>
        {resDay.stones.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <h3>Медитації</h3>
      <ul>
        {resDay.meditations.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>

      <h3>Сон</h3>
      <p>
        <strong>{resDay.dreams.title}</strong>
      </p>
      <p>{resDay.dreams.meaning}</p>
      <p>
        Оцінка: {resDay.dreams.rating.value}/{resDay.dreams.rating.scale} —{" "}
        {resDay.dreams.rating.meaning}
      </p>

      <h3>Аспекти життя</h3>
      {Object.entries(resDay.lifeAspects).map(([key, aspect]) => (
        <div key={key}>
          <h4>{aspectTitles[key] ?? key}</h4>
          <p>{aspect.text}</p>
          <p>
            Оцінка: {aspect.rating.value}/{aspect.rating.scale} —{" "}
            {aspect.rating.meaning}
          </p>
        </div>
      ))}

      <h3>Народжені цього дня</h3>
      <p>
        <strong>{resDay.birthOnThisDay.title}</strong>
      </p>
      <p>{resDay.birthOnThisDay.description}</p>

      <h3>Здоровʼя</h3>

      <h4>Загальне</h4>
      <p>{resDay.health.general.text}</p>
      <p>
        Оцінка: {resDay.health.general.rating.value}/
        {resDay.health.general.rating.scale} —{" "}
        {resDay.health.general.rating.meaning}
      </p>

      <h4>Вразлива частина тіла</h4>
      <p>{resDay.health.vulnerableBodyPart.text}</p>
      <p>
        Оцінка: {resDay.health.vulnerableBodyPart.rating.value}/
        {resDay.health.vulnerableBodyPart.rating.scale} —{" "}
        {resDay.health.vulnerableBodyPart.rating.meaning}
      </p>

      <h4>Медикаменти</h4>
      <p>{resDay.health.medications.text}</p>
      <p>
        Оцінка: {resDay.health.medications.rating.value}/
        {resDay.health.medications.rating.scale} —{" "}
        {resDay.health.medications.rating.meaning}
      </p>

      <h3>Стрижка</h3>
      <p>Місячний календар: {resDay.haircut.lunarCalendar}</p>
      <p>Тибетський календар: {resDay.haircut.tibetanCalendar}</p>
      <p>
        Оцінка: {resDay.haircut.rating.value}/{resDay.haircut.rating.scale} —{" "}
        {resDay.haircut.rating.meaning}
      </p>

      <h3>Знаки</h3>
      <h4>Сприятливі</h4>
      <ul>
        {resDay.signs.good.map((g) => (
          <li key={g}>{g}</li>
        ))}
      </ul>

      <h4>Несприятливі</h4>
      <ul>
        {resDay.signs.bad.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      <h3>Розширене значення</h3>
      <p>{resDay.extendedMeaning}</p>
    </div>
  );
};

export default MoonDayDetails;
