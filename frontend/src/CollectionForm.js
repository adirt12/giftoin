import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

function CollectionForm({
  open,
  handleClose,
  handleSave,
  newCollection,
  handleInputChange,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Collection</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="collection_name"
          label="Name"
          type="text"
          fullWidth
          value={newCollection.collection_name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          value={newCollection.description}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="image_url"
          label="Image URL"
          type="text"
          fullWidth
          value={newCollection.image_url}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="number_of_cards"
          label="Number of Cards"
          type="number"
          fullWidth
          value={newCollection.number_of_cards}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="start_date"
          label="Start Date"
          type="date"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          value={newCollection.start_date}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="end_date"
          label="End Date"
          type="date"
          fullWidth
          slotProps={{
            inputLabel: { shrink: true },
          }}
          value={newCollection.end_date}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CollectionForm;
