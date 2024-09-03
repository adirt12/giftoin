import React, { useState, useEffect } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import CollectionForm from "./CollectionForm";
import axios from "axios";

function Dashboard() {
  const [collections, setCollections] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("http://localhost:8000/collections");
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections", error);
      }
    };

    fetchCollections();
  }, [refreshData]);

  const [open, setOpen] = useState(false);
  const [newCollection, setNewCollection] = useState({
    collection_name: "",
    description: "",
    image_url: "",
    number_of_cards: 0,
    start_date: "",
    end_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollection({ ...newCollection, [name]: value });
  };

  const handleSave = async () => {
    if (!newCollection.image_url || !newCollection.collection_name) {
      alert("Please fill in all required fields.");
    } else if (newCollection.start_date > newCollection.end_date) {
      alert("Start date cannot be after end date.");
    } else if (newCollection.number_of_cards < 0) {
      alert("Please enter a valid number of cards.");
    } else {
      try {
        await axios.post("http://localhost:8000/addCard", {
          collection_name: newCollection.collection_name,
          description: newCollection.description,
          image_url: newCollection.image_url,
          number_of_cards: newCollection.number_of_cards,
          start_date: newCollection.start_date,
          end_date: newCollection.end_date,
        });
        setNewCollection({
          collection_name: "",
          description: "",
          image_url: "",
          number_of_cards: 0,
          start_date: "",
          end_date: "",
        });
        setRefreshData(!refreshData);
      } catch (error) {
        console.error("Error making the GET request", error);
      }
      setOpen(false);
    }
  };

  const handleDelete = async (id) => {
    // setCollections(collections.filter((collection) => collection._id !== id));
    try {
      await axios.delete(`http://localhost:8000/deleteCard/${id}`);
      setRefreshData(!refreshData);
      // setCollections(collections.filter((collection) => collection._id !== id));
    } catch (error) {
      console.error("Error deleting collection", error);
    }
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Card Collection Management Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={handleAdd}
        sx={{ mb: 3 }}
      >
        Add Collection
      </Button>
      <Grid container spacing={3}>
        {collections.map((collection) => (
          <Grid xs={12} sm={6} md={4} key={collection._id}>
            <Card>
              <CardContent>
                <img
                  src={collection.image_url}
                  alt={collection.collection_name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  {collection.collection_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {collection.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cards: {collection.number_of_cards}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration:{" "}
                  {new Date(collection.start_date).toLocaleDateString()} -{" "}
                  {new Date(collection.end_date).toLocaleDateString()}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(collection._id)}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CollectionForm
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        newCollection={newCollection}
        handleInputChange={handleInputChange}
      />
    </Box>
  );
}

export default Dashboard;
