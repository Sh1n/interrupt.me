// In this file interruptions types are configured

pouzApp.value('interruptions', {

  categories: {
    'health': {
      title: 'Health',
      description: 'Healthy pouzes...',
      picture: ''
    },
    'food': {
      title: 'Food',
      description: 'Food is always good pick',
      picture: ''
    },
  },

  interruptions: {
    'beer': {
      category: 'food',
      title: 'Beer',
      description: 'Have some beer!',
      picture: ''
    },
    'lunch': {
      category: 'food',
      title: 'Go to lunch',
      description: 'You should not starve!',
      picture: ''
    },
  }

});