document.getElementById('newUserForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const username = formData.get('username');
  
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });
      const data = await response.json();
      document.getElementById('newUserResult').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('newUserResult').textContent = 'Error creating user.';
    }
  });
  
  document.getElementById('addExerciseForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const userId = formData.get('_id');
    const description = formData.get('description');
    const duration = formData.get('duration');
    const date = formData.get('date');
  
    if (!userId || !description || !duration) {
        document.getElementById('addExerciseResult').textContent = 'User ID, description, and duration are required.';
        return;
    }
  
    const body = { description, duration };
    if (date) {
        body.date = date;
    }
  
    try {
      const response = await fetch(`/api/users/${userId}/exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      document.getElementById('addExerciseResult').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('addExerciseResult').textContent = 'Error adding exercise.';
    }
  });
  
  document.getElementById('getLogForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const userId = formData.get('_id');
      const from = formData.get('from');
      const to = formData.get('to');
      const limit = formData.get('limit');
  
      if (!userId) {
          document.getElementById('getLogResult').textContent = 'User ID is required.';
          return;
      }
  
      let url = `/api/users/${userId}/logs`;
      const params = new URLSearchParams();
      if (from) params.append('from', from);
      if (to) params.append('to', to);
      if (limit) params.append('limit', limit);
  
      if (params.toString()) {
          url += '?' + params.toString();
      }
  
      try {
          const response = await fetch(url);
          const data = await response.json();
          document.getElementById('getLogResult').textContent = JSON.stringify(data, null, 2);
      } catch (error) {
          console.error('Error:', error);
          document.getElementById('getLogResult').textContent = 'Error fetching log.';
      }
  });