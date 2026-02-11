import React, { useState, useEffect } from 'react';
import "./teachers-test.scss";
import { Link } from 'react-router-dom';
import { api } from '../../App';
const TeachersTest = () => {
    const language = localStorage.getItem("language") || "uz";
    const [animatedSubjects, setAnimatedSubjects] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const translations = {
        uz: {
            testsCommon: [
                { type: "Fan bo‘yicha test", count: 35 },
                { type: "Pedagogik mahorat", count: 10 },
                { type: "Kasbiy standart", count: 5 }
            ],

            categoryNames: {
                humanities: { label: "Gumanitar", description: "Tarix, adabiyot va tillar" },
                natural: { label: "Tabiiy", description: "Tabiiy fanlar" },
                formal: { label: "Aniq", description: "Aniq fanlar" },
                social: { label: "Ijtimoiy", description: "Jamiyat fanlari" },
                technical: { label: "Texnik", description: "Texnologiya va informatika" }
            },

            title: "O‘qituvchilar uchun malaka (toifa) imtihonlari",
            description: "Barcha fan va yo‘nalishlar bo‘yicha testlar",
            viewAll: "Testlarga o'tish"
        },

        kaa: {
            testsCommon: [
                { type: "Pän boyinsha test", count: 35 },
                { type: "Pedagogikalıq deñgey", count: 10 },
                { type: "Kásiptiy standart", count: 5 }
            ],

            categoryNames: {
                humanities: { label: "Gumanitar", description: "Tarıx, ádebiyat hám tiller" },
                natural: { label: "Tabiǵiy", description: "Tabiǵiy pánler" },
                formal: { label: "Anıq", description: "Matematika hám anıq pánler" },
                social: { label: "Álewmetlik", description: "Álewmetlik pánler" },
                technical: { label: "Texnikalıq", description: "Texnologiya hám informatika" }
            },

            title: "Oqıtwshılar ushın toypa imtixanları",
            description: "Barlıq pánler boyınsha testler",
            viewAll: "Testlerge ótish"
        },

        ru: {
            testsCommon: [
                { type: "Тест по предмету", count: 35 },
                { type: "Педагогическое мастерство", count: 10 },
                { type: "Профессиональный стандарт", count: 5 }
            ],

            categoryNames: {
                humanities: { label: "Гуманитарные", description: "История, языки и литература" },
                natural: { label: "Естественные", description: "Естественно-научные предметы" },
                formal: { label: "Точные", description: "Математика и точные науки" },
                social: { label: "Социальные", description: "Общество и социальные науки" },
                technical: { label: "Технические", description: "Технологии и информатика" }
            },

            title: "Квалификационные экзамены для учителей",
            description: "Тесты по всем предметам",
            viewAll: "Перейти к тестам"
        },

        en: {
            testsCommon: [
                { type: "Subject test", count: 35 },
                { type: "Pedagogical skills", count: 10 },
                { type: "Professional standard", count: 5 }
            ],

            categoryNames: {
                humanities: { label: "Humanities", description: "History, languages and literature" },
                natural: { label: "Natural Sciences", description: "Natural science subjects" },
                formal: { label: "Exact Sciences", description: "Mathematics and exact sciences" },
                social: { label: "Social Sciences", description: "Society and social studies" },
                technical: { label: "Technical", description: "Technology and informatics" }
            },

            title: "Qualification exams for teachers",
            description: "Tests for all subjects and categories",
            viewAll: "Go to tests"
        }
    };



    const colors = [
        "purlpe",
        "green",
        "orange",
        "#FFD93D",
        "#pink",
        "red",
        "#00C9A7",
        "#FF6F91",
        "#FFC75F",
        "crimson",
        "#D65DB1",
        "#0081CF"
    ];
    const t = translations[language] || translations["uz"];

    const getLanguageClass = () => {
        return language === "ru" || language === "kaa" ? "ru" : "";
    };

    const formatLink = (text) => {
        return text.replace(/'/g, "").replace(/\s+/g, "-").toLowerCase();
    };
    const getShortLabel = (label) => {
        if (label.length > 12) {
            return label.split(" ")[0];
        }
        return label;
    };
    useEffect(() => {
        const fetchTests = async () => {
            const token = localStorage.getItem("accessToken");
            setLoading(true);
            try {
                 const response = await fetch(`${api}/category_exams/testsubjects/`, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                if (!response.ok) throw new Error("Network error");

                const data = await response.json();

                setSubjects(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);


    const languageClass = getLanguageClass();

    return (
        <div className={`t-tests ${languageClass}`} id='subject-tests'>

            <div className="t-tests-inner">
                <div className="tbrow">
                    <div className={`cell ${languageClass}`}>
                        <ul className={`subjects-list sl-3 ${languageClass}`}>
                            {subjects.map((subject, index) => (
                                <li
                                    key={subject.guid}
                                    className="subject-card"
                                    style={{ color: colors[index % colors.length] }}
                                >
                                    <div className='cont-card'>
                                        <div className="card-content">
                                            <div style={{ display: 'flex' }} className='main-d'>
                                                <div style={{ background: colors[index % colors.length] }} className="icon-wrapper">
                                                    <img src={subject.image} alt={subject.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                                </div>
                                                <div className='left-d'>
                                                    <h4>{getShortLabel(subject.title)}</h4>

                                                    <span className="category" style={{ color: colors[index % colors.length] }}>
                                                        {subject.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="subject-desc">
                                                {subject.description.split('\r\n').map((line, i) => (
                                                    <p key={i} style={{ color: colors[index % colors.length] }}>{line}</p>
                                                ))}
                                            </div>
                                            <div className="btn-card">
                                                <Link to={`/toifa-imtihonlari/${subject.guid}`} className={languageClass}>
                                                    <button style={{ background: colors[index % colors.length] }}>
                                                        {t.viewAll}
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                            ))}
                        </ul>
                        <p>
                            <Link to="/toifa-imtihonlari" className={languageClass}>
                                {t.viewAll}
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeachersTest;