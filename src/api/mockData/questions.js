export const eventQuestions = [
    {
        "id": 1,
        "description": "Have you ever had to sacrifice personal interests for the responsibility of others or other circumstances?",
        "choices": [
            {
                "id": 1,
                "description": "Yes",
                "value": 1
            },
            {
                "id": 2,
                "description": "No",
                "value": -1
            },
        ]
    },
    {
        "id": 2,
        "description": "Did you grow up in a single-parent home?",
        "choices": [
            {
                "id": 5,
                "description": "Yes",
                "value": 1
            },
            {
                "id": 6,
                "description": "No",
                "value": -1
            },
        ]
    },
    {
        "id": 3,
        "description": "What is the highest level of education achieved by any of your parents?",
        "choices": [
            {
                "id": 7,
                "description": "High School",
                "value": 0
            },
            {
                "id": 8,
                "description": "Some college",
                "value": 1
            },
            {
                "id": 9,
                "description": "Bachelor's",
                "value": 2
            },
            {
                "id": 10,
                "description": "Master's / Phd",
                "value": 3
            },
        ]
    },  
    // {
    //     "id": 4,
    //     "description": "Have you or your family never had to move due to financial inabilities?",
    //     "choices": [
    //         {
    //             "id": 11,
    //             "description": "Yes",
    //             "value": 1
    //         },
    //         {
    //             "id": 12,
    //             "description": "No",
    //             "value": -1
    //         },
    //     ]
    // },
    // {
    //     "id": 5,
    //     "description": "Has anyone in your immediate family has ever been addicted to drugs or alcohol?",
    //     "choices": [
    //         {
    //             "id": 13,
    //             "description": "Yes",
    //             "value": 1
    //         },
    //         {
    //             "id": 14,
    //             "description": "No",
    //             "value": -1
    //         },
    //     ]
    // },
]

/**
 * Questions Answer data format
 */
 export const questionAnswers = [
    // Dictionary of questions in the order in which the questions were asked.
    {
        question: "Question 1?",
        answers: [
            {
                "answer": "YES", // answer option
                "count": 2  // Number of users who chose this answer for this question. 
            },
            {
                "answer": "NO",
                "count": 3
            }
        ],  
    },
    {
        question: "Question 2?",
        answers: [
            {
                "answer": "High Scool's",
                "count": 10
            },
            {
                "answer": "Bachelor's",
                "count": 4
            },
            {
                "answer": "Masters",
                "count": 3
            }
        ],      
    }
]
