module.exports = {
  getJson: () => {
    const endpoints = [
      {
        type: 'GET',
        endpoint: '/createCycloneAlert',
        parameters: [
          {
            id: 'telegramId',
            type: 'string',
          },
        ],
        description: 'Saves user to receive cyclone alert.',
      },
      {
        type: 'GET',
        endpoint: '/userCycloneAlert',
        parameters: [
          {
            id: 'telegramId',
            type: 'string',
          },
        ],
        description: 'Returns to user whether or not he has cyclone alert.',
      },
      {
        type: 'GET',
        endpoint: '/deleteCycloneAlert',
        parameters: [
          {
            id: 'telegramId',
            type: 'string',
          },
        ],
        description: 'Delete the user so he does not receive the cyclone alert',
      },
      {
        type: 'GET',
        endpoint: '/allCyclones',
        parameters: [
          {
          },
        ],
        description: 'Returns all the cyclones that are currently happening',
      },
    ];

    return endpoints;
  },
};
