const question1 = new RadioQuestion({
    exam: 'CCNA',
    category: 'Switching',
    question: 'What is a broadcast address used for?',
    questionType: "Radio",
    isPublished: true,
    prompt1: 'To route packets',
    prompt2: 'To reply to an arp',
    prompt3: 'To broadcast a message to all devices on a given subnet',
    prompt4: 'To tell people where the broadcast is',
    answers: [false, false, true, false],
    rating: [{user: 'user1', rating: 4}, {user: 'user2', rating: 5}],
    contributedBy: 'Zack',
    explainations: [{ 
        id: '123',
        questionId: 'Id of Q',
        userId: 'Zack',
        text: 'Broadcasts sent to the broadcasat address of a subnet to send packets to all available hosts on that network.',
        ratings:  [2,4,5],
        comments: ['Great Question!', 'Ugg...This makes no sense!']
    }],
    date: new Date()
})

const question2 = new RadioQuestion({
    exam: 'CCNA',
    category: 'Routing',
    question: 'What is OSPF',
    questionType: "Radio",
    isPublished: true,
    prompt1: 'To switch packets',
    prompt2: 'To reply to an arp',
    prompt3: 'To broadcast a message to all devices on a given subnet',
    prompt4: 'A dynamic Routing protocol',
    answers: [false, false, false, true],
    rating: [{user: 'user1', rating: 4}, {user: 'user2', rating: 5}],
    contributedBy: 'Zack',
    explainations: [{ 
        id: '2',
        questionId: '3',
        userId: 'Zack',
        text: 'Broadcasts sent to the broadcasat address of a subnet to send packets to all available hosts on that network.',
        ratings:  [2,4,5],
        comments: ['Great Question!', 'Ugg...This makes no sense!']
    }],
    date: new Date()
})