import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SupportPage from '../support/pages/SupportPage';
import RaiseTicketPage from '../support/pages/RaiseTicketPage';
import MyTicketsPage from '../support/pages/MyTicketsPage';
import TicketDetailPage from '../support/pages/TicketDetailPage';
import ContactSupportPage from '../support/pages/ContactSupportPage';

export default function SupportRoutes() {
    return (
        <Routes>
            <Route path="/" element={<SupportPage />} />
            <Route path="/raise-ticket" element={<RaiseTicketPage />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            <Route path="/ticket/:ticketId" element={<TicketDetailPage />} />
            <Route path="/contact" element={<ContactSupportPage />} />
            <Route path="/faqs" element={<ContactSupportPage />} />
        </Routes>
    );
}
