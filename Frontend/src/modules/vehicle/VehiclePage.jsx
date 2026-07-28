import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Plus, Edit2, Trash2, CheckCircle, X, AlertCircle } from 'lucide-react';
import './VehiclePage.css';

const VehiclePage = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([
        {
            id: 1,
            name: 'My Tesla Model 3',
            manufacturer: 'Tesla',
            model: 'Model 3',
            year: 2023,
            battery: '75 kWh',
            connector: 'CCS2',
            registration: 'ABC-1234',
            color: 'Pearl White',
            isDefault: true,
            image: null
        },
        {
            id: 2,
            name: 'Family SUV',
            manufacturer: 'Hyundai',
            model: 'Ioniq 5',
            year: 2022,
            battery: '72.6 kWh',
            connector: 'CCS2',
            registration: 'XYZ-5678',
            color: 'Gravity Gold',
            isDefault: false,
            image: null
        }
    ]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [vehicleToDelete, setVehicleToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleBack = () => navigate(-1);

    const handleSetDefault = (id) => {
        setVehicles(prev => prev.map(v => ({ ...v, isDefault: v.id === id })));
        setSuccessMessage('Default vehicle updated');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setShowAddDialog(true);
    };

    const handleDelete = (vehicle) => {
        setVehicleToDelete(vehicle);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVehicles(prev => prev.filter(v => v.id !== vehicleToDelete.id));
        setIsDeleting(false);
        setShowDeleteDialog(false);
        setSuccessMessage('Vehicle deleted successfully');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const handleAddNew = () => {
        setEditingVehicle(null);
        setShowAddDialog(true);
    };

    const handleSaveVehicle = (vehicleData) => {
        if (editingVehicle) {
            setVehicles(prev => prev.map(v => v.id === editingVehicle.id ? { ...v, ...vehicleData } : v));
            setSuccessMessage('Vehicle updated successfully');
        } else {
            const newVehicle = {
                ...vehicleData,
                id: Date.now(),
                isDefault: vehicles.length === 0
            };
            setVehicles([...vehicles, newVehicle]);
            setSuccessMessage('Vehicle added successfully');
        }
        setShowAddDialog(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <div className="vehicle-page">
            {showSuccess && (
                <div className="success-toast-inline">
                    <CheckCircle size={20} />
                    <span>{successMessage}</span>
                </div>
            )}

            <div className="vehicle-header">
                <button className="vehicle-back" onClick={handleBack}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <h1 className="vehicle-title">My Vehicles</h1>
                <button className="vehicle-add-btn" onClick={handleAddNew}>
                    <Plus size={20} />
                </button>
            </div>

            <div className="vehicle-content">
                {vehicles.length === 0 ? (
                    <div className="empty-state">
                        <Car size={64} strokeWidth={1} />
                        <h3>No Vehicles Yet</h3>
                        <p>Add your first vehicle to get started</p>
                        <button className="btn-primary" onClick={handleAddNew}>
                            <Plus size={18} />
                            Add Vehicle
                        </button>
                    </div>
                ) : (
                    vehicles.map((vehicle) => (
                        <VehicleCard
                            key={vehicle.id}
                            vehicle={vehicle}
                            onSetDefault={handleSetDefault}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>

            {/* Add/Edit Vehicle Dialog */}
            {showAddDialog && (
                <AddEditVehicleDialog
                    vehicle={editingVehicle}
                    onSave={handleSaveVehicle}
                    onClose={() => setShowAddDialog(false)}
                />
            )}

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && vehicleToDelete && (
                <div className="dialog-overlay" onClick={() => setShowDeleteDialog(false)}>
                    <div className="dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="dialog__header">
                            <h3 className="dialog__title">Delete Vehicle</h3>
                            <button className="dialog__close" onClick={() => setShowDeleteDialog(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="dialog__content">
                            <AlertCircle size={48} className="warning-icon" />
                            <p>Are you sure you want to delete <strong>{vehicleToDelete.name}</strong>?</p>
                            <p className="delete-warning">This action cannot be undone.</p>
                        </div>
                        <div className="dialog__actions">
                            <button className="dialog__btn dialog__btn--secondary" onClick={() => setShowDeleteDialog(false)}>
                                Cancel
                            </button>
                            <button 
                                className="dialog__btn dialog__btn--danger" 
                                onClick={confirmDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const VehicleCard = ({ vehicle, onSetDefault, onEdit, onDelete }) => {
    return (
        <div className={`vehicle-card ${vehicle.isDefault ? 'default' : ''}`}>
            <div className="vehicle-card__header">
                <div className="vehicle-card__info">
                    <h4 className="vehicle-card__title">{vehicle.name}</h4>
                    <p className="vehicle-card__subtitle">{vehicle.manufacturer} {vehicle.model}</p>
                </div>
                {vehicle.isDefault && (
                    <span className="default-badge">
                        <CheckCircle size={16} />
                        Default
                    </span>
                )}
            </div>

            <div className="vehicle-card__details">
                <div className="detail-grid">
                    <div className="detail-item">
                        <span className="detail-label">Year</span>
                        <span className="detail-value">{vehicle.year}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Battery</span>
                        <span className="detail-value">{vehicle.battery}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Connector</span>
                        <span className="detail-value">{vehicle.connector}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Registration</span>
                        <span className="detail-value">{vehicle.registration}</span>
                    </div>
                </div>
            </div>

            <div className="vehicle-card__actions">
                {!vehicle.isDefault && (
                    <button className="action-btn secondary" onClick={() => onSetDefault(vehicle.id)}>
                        Set Default
                    </button>
                )}
                <button className="action-btn secondary" onClick={() => onEdit(vehicle)}>
                    <Edit2 size={16} />
                    Edit
                </button>
                <button className="action-btn danger" onClick={() => onDelete(vehicle)}>
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>
        </div>
    );
};

const AddEditVehicleDialog = ({ vehicle, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: vehicle?.name || '',
        manufacturer: vehicle?.manufacturer || '',
        model: vehicle?.model || '',
        year: vehicle?.year || new Date().getFullYear(),
        battery: vehicle?.battery || '',
        connector: vehicle?.connector || 'CCS2',
        registration: vehicle?.registration || '',
        color: vehicle?.color || ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Vehicle name is required';
        if (!formData.manufacturer) newErrors.manufacturer = 'Manufacturer is required';
        if (!formData.model) newErrors.model = 'Model is required';
        if (!formData.year || formData.year < 1990 || formData.year > new Date().getFullYear() + 1) {
            newErrors.year = 'Valid year is required';
        }
        if (!formData.battery) newErrors.battery = 'Battery capacity is required';
        if (!formData.registration) newErrors.registration = 'Registration number is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        onSave(formData);
    };

    return (
        <div className="dialog-overlay" onClick={onClose}>
            <div className="dialog vehicle-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog__header">
                    <h3 className="dialog__title">{vehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
                    <button className="dialog__close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <form className="dialog__form" onSubmit={handleSubmit}>
                    <div className="dialog__content">
                        <div className="form-group">
                            <label className="form-label">Vehicle Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className={`form-input ${errors.name ? 'error' : ''}`}
                                placeholder="e.g., My Daily Driver"
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Manufacturer *</label>
                                <input
                                    type="text"
                                    value={formData.manufacturer}
                                    onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                                    className={`form-input ${errors.manufacturer ? 'error' : ''}`}
                                    placeholder="e.g., Tesla"
                                />
                                {errors.manufacturer && <span className="error-message">{errors.manufacturer}</span>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Model *</label>
                                <input
                                    type="text"
                                    value={formData.model}
                                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                                    className={`form-input ${errors.model ? 'error' : ''}`}
                                    placeholder="e.g., Model 3"
                                />
                                {errors.model && <span className="error-message">{errors.model}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Year *</label>
                                <input
                                    type="number"
                                    value={formData.year}
                                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                                    className={`form-input ${errors.year ? 'error' : ''}`}
                                    min="1990"
                                    max={new Date().getFullYear() + 1}
                                />
                                {errors.year && <span className="error-message">{errors.year}</span>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Battery Capacity *</label>
                                <input
                                    type="text"
                                    value={formData.battery}
                                    onChange={(e) => setFormData({...formData, battery: e.target.value})}
                                    className={`form-input ${errors.battery ? 'error' : ''}`}
                                    placeholder="e.g., 75 kWh"
                                />
                                {errors.battery && <span className="error-message">{errors.battery}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Connector Type *</label>
                                <select
                                    value={formData.connector}
                                    onChange={(e) => setFormData({...formData, connector: e.target.value})}
                                    className="form-input"
                                >
                                    <option value="CCS2">CCS2</option>
                                    <option value="Type2">Type 2</option>
                                    <option value="CHAdeMO">CHAdeMO</option>
                                    <option value="Tesla">Tesla Supercharger</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Registration Number *</label>
                                <input
                                    type="text"
                                    value={formData.registration}
                                    onChange={(e) => setFormData({...formData, registration: e.target.value.toUpperCase()})}
                                    className={`form-input ${errors.registration ? 'error' : ''}`}
                                    placeholder="ABC-1234"
                                />
                                {errors.registration && <span className="error-message">{errors.registration}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Color</label>
                            <input
                                type="text"
                                value={formData.color}
                                onChange={(e) => setFormData({...formData, color: e.target.value})}
                                className="form-input"
                                placeholder="e.g., Pearl White"
                            />
                        </div>
                    </div>
                    <div className="dialog__actions">
                        <button type="button" className="dialog__btn dialog__btn--secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="dialog__btn dialog__btn--primary" disabled={isLoading}>
                            {isLoading ? 'Saving...' : (vehicle ? 'Update' : 'Add')} Vehicle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VehiclePage;
