// JavaScript (React)
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper
} from '@mui/material';

const priorities = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
];

export default function AddTask({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAddTask({ title, description, dueDate, priority });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          maxWidth: 480,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
            letterSpacing: 1,
            color: '#2d3a4b',
            fontFamily: 'Segoe UI, sans-serif',
            textAlign: 'center',
          }}
        >
          Add New Task
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Task Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
                background: '#f8fafc',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6a82fb',
              },
            }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            multiline
            rows={3}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
                background: '#f8fafc',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6a82fb',
              },
            }}
          />
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
                background: '#f8fafc',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6a82fb',
              },
            }}
          />
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={e => setPriority(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: 2,
                background: '#f8fafc',
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6a82fb',
              },
            }}
          >
            {priorities.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 600,
              fontSize: '1rem',
              borderRadius: 2,
              background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)',
              boxShadow: '0 4px 14px 0 rgba(252, 92, 125, 0.15)',
              transition: 'background 0.3s',
              '&:hover': {
                background: 'linear-gradient(90deg, #fc5c7d 0%, #6a82fb 100%)',
              },
            }}
          >
            Add Task
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}