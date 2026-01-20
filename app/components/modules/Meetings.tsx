'use client';

import { useState } from 'react';
import { useApp } from '@/lib/store';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { Meeting } from '@/lib/types';
import { Calendar, Clock, Users, FileText, Video, ChevronRight } from 'lucide-react';

export default function Meetings() {
  const { meetings, deals, stakeholders, getDealById, getStakeholderById } = useApp();
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [viewMode, setViewMode] = useState<'upcoming' | 'past'>('upcoming');

  // Sort and filter meetings
  const now = new Date();
  const sortedMeetings = [...meetings].sort((a, b) =>
    a.scheduledDate.localeCompare(b.scheduledDate)
  );

  const upcomingMeetings = sortedMeetings.filter(
    m => new Date(m.scheduledDate) >= now && !m.completed
  );
  const pastMeetings = sortedMeetings.filter(
    m => new Date(m.scheduledDate) < now || m.completed
  ).reverse();

  const displayMeetings = viewMode === 'upcoming' ? upcomingMeetings : pastMeetings;

  // Get stakeholder names
  const getStakeholderNames = (ids: string[]) =>
    ids
      .map(id => getStakeholderById(id)?.name)
      .filter(Boolean)
      .join(', ');

  // Meeting type badge color
  const getMeetingTypeBadge = (type: Meeting['meetingType']) => {
    const variants: Record<string, 'default' | 'info' | 'success' | 'warning'> = {
      intro: 'info',
      discovery: 'default',
      proposal: 'success',
      negotiation: 'warning',
      'check-in': 'default',
      other: 'default',
    };
    return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
  };

  // Format date for display
  const formatMeetingDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="module-container">
      <header className="module-header">
        <div>
          <h1 className="module-title">Meeting Ops</h1>
          <p className="module-subtitle">
            Prepare, execute, and capture meeting value
          </p>
        </div>
      </header>

      {/* View Toggle */}
      <div className="view-toggle">
        <button
          className={`toggle-btn ${viewMode === 'upcoming' ? 'toggle-btn--active' : ''}`}
          onClick={() => setViewMode('upcoming')}
        >
          Upcoming ({upcomingMeetings.length})
        </button>
        <button
          className={`toggle-btn ${viewMode === 'past' ? 'toggle-btn--active' : ''}`}
          onClick={() => setViewMode('past')}
        >
          Past ({pastMeetings.length})
        </button>
      </div>

      <div className="meetings-layout">
        {/* Meeting List */}
        <div className="meeting-list-container">
          {displayMeetings.length === 0 ? (
            <Card>
              <CardContent>
                <p className="empty-state">
                  No {viewMode} meetings
                </p>
              </CardContent>
            </Card>
          ) : (
            displayMeetings.map(meeting => {
              const deal = meeting.linkedDealId ? getDealById(meeting.linkedDealId) : null;

              return (
                <Card
                  key={meeting.id}
                  onClick={() => setSelectedMeeting(meeting)}
                  variant={selectedMeeting?.id === meeting.id ? 'highlight' : 'default'}
                  className="meeting-card"
                >
                  <CardContent>
                    <div className="meeting-card-date">
                      <span className="meeting-day">{formatMeetingDate(meeting.scheduledDate)}</span>
                      <span className="meeting-time">{formatTime(meeting.scheduledDate)}</span>
                    </div>

                    <div className="meeting-card-content">
                      <h3 className="meeting-title">{meeting.title}</h3>
                      <div className="meeting-meta">
                        {getMeetingTypeBadge(meeting.meetingType)}
                        <span className="meeting-duration">
                          <Clock size={14} /> {meeting.duration} min
                        </span>
                      </div>
                      {deal && (
                        <span className="meeting-deal">
                          📋 {deal.dealName}
                        </span>
                      )}
                      <span className="meeting-attendees">
                        <Users size={14} /> {getStakeholderNames(meeting.stakeholderIds)}
                      </span>
                    </div>

                    <ChevronRight size={18} className="meeting-card-arrow" />
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Meeting Detail Panel */}
        {selectedMeeting ? (
          <div className="meeting-detail">
            <Card>
              <CardHeader>
                <CardTitle subtitle={formatMeetingDate(selectedMeeting.scheduledDate)}>
                  {selectedMeeting.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="meeting-detail-header">
                  {getMeetingTypeBadge(selectedMeeting.meetingType)}
                  <span className="meeting-detail-time">
                    <Clock size={16} /> {formatTime(selectedMeeting.scheduledDate)}
                    {' • '}{selectedMeeting.duration} min
                  </span>
                </div>

                {/* Linked Deal */}
                {selectedMeeting.linkedDealId && (
                  <div className="detail-section">
                    <h4 className="detail-label">Linked Deal</h4>
                    <p className="detail-text">
                      {getDealById(selectedMeeting.linkedDealId)?.dealName}
                    </p>
                  </div>
                )}

                {/* Attendees */}
                <div className="detail-section">
                  <h4 className="detail-label">
                    <Users size={16} /> Attendees
                  </h4>
                  <div className="attendee-list">
                    {selectedMeeting.stakeholderIds.map(id => {
                      const stakeholder = getStakeholderById(id);
                      if (!stakeholder) return null;
                      return (
                        <div key={id} className="attendee-item">
                          <div className="attendee-avatar">
                            {stakeholder.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="attendee-info">
                            <span className="attendee-name">{stakeholder.name}</span>
                            <span className="attendee-role">{stakeholder.role}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Agenda */}
                {selectedMeeting.agenda && (
                  <div className="detail-section">
                    <h4 className="detail-label">
                      <FileText size={16} /> Agenda
                    </h4>
                    <pre className="meeting-agenda">{selectedMeeting.agenda}</pre>
                  </div>
                )}

                {/* Notes */}
                {selectedMeeting.notes && (
                  <div className="detail-section">
                    <h4 className="detail-label">Notes</h4>
                    <p className="detail-text">{selectedMeeting.notes}</p>
                  </div>
                )}

                {/* Outcome (for completed meetings) */}
                {selectedMeeting.completed && selectedMeeting.outcome && (
                  <div className="detail-section">
                    <h4 className="detail-label">Outcome</h4>
                    <p className="detail-text">{selectedMeeting.outcome}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="meeting-actions">
                  <button className="action-btn action-btn--primary">
                    <Video size={16} /> Join Meeting
                  </button>
                  <button className="action-btn">
                    <FileText size={16} /> Add Notes
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="meeting-detail meeting-detail--empty">
            <Calendar size={48} />
            <p>Select a meeting to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
