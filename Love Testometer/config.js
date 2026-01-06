const CONFIG = {
    productName: "Twilight",

    questions: [
        {
            key: "vibe",
            text: "What’s your vibe?",
            answers: [
                { label: "Sweet & cozy", points: 33, reason: "You love warm, feel-good choices" },
                { label: "Balanced & relaxed", points: 22, reason: "You like things that feel easy and enjoyable" },
                { label: "Bold & adventurous", points: 11, reason: "You enjoy trying something different" }
            ]
        },
        {
            key: "moment",
            text: "When do you enjoy things most?",
            answers: [
                { label: "Special occasions", points: 33, reason: "You love making moments feel memorable" },
                { label: "Both everyday & special", points: 22, reason: "You like versatility" },
                { label: "Everyday comfort", points: 11, reason: "You value familiarity and routine" }
            ]
        },
        {
            key: "energy",
            text: "Pick your energy:",
            answers: [
                { label: "Playful & fun", points: 33, reason: "You enjoy lighthearted experiences" },
                { label: "A mix of both", points: 22, reason: "You appreciate balance" },
                { label: "Classic & timeless", points: 11, reason: "You prefer traditional style" }
            ]
        }
    ],

    tiers: [
        { min: 88, label: "💘 Perfect Match!" },
        { min: 66, label: "❤️ Strong Spark!" },
        { min: 44, label: "💞 Casual Chemistry!" },
        { min: 0, label: "😄 Friendly Energy!" }
    ]
};
