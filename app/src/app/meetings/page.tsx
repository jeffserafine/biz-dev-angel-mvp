'use client';

/**
 * Meeting Ops
 *
 * Manage scheduled meetings, prep notes, and follow-ups.
 * Central hub for meeting intelligence.
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  mockMeetings,
  getAccountById,
  getDealById,
  getStakeholderById,
} from '@/data/mockData';
import { formatRelativeDate } from '@/lib/dealLogic';
import type { Meeting, MeetingType } from '@/types';

const meetingTypeLabels: Record<MeetingType, string> = {
  intro: 'Intro',
  discovery: 'Discovery',
  demo: 'Demo',
  negotiation: 'Negotiation',
  closing: 'Closing',
  'check-in': 'Check-in',
  other: 'Other',
};

const meetingTypeColors: Record<MeetingType, string> = {
  intro: 'bg-blue-900/50 text-blue-400 border border-blue-800',
  discovery: 'bg-purple-900/50 text-purple-400 border border-purple-800',
  demo: 'bg-amber-900/50 text-amber-400 border border-amber-800',
  negotiation: 'bg-red-900/50 text-red-400 border border-red-800',
  closing: 'bg-emerald-900/50 text-emerald-400 border border-emerald-800',
  'check-in': 'bg-zinc-700 text-zinc-300',
  other: 'bg-zinc-700 text-zinc-300',
};

export default function MeetingsPage() {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const now = new Date();

  // Separate upcoming and past meetings
  const upcomingMeetings = mockMeetings
    .filter((m) => !m.completed && m.scheduledAt > now)
    .sort((a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime());

  const pastMeetings = mockMeetings
    .filter((m) => m.completed || m.scheduledAt <= now)
    .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime());

  const displayMeetings = showCompleted ? pastMeetings : upcomingMeetings;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Meeting Ops</h1>
          <p className="text-zinc-500 mt-1">
            {upcomingMeetings.length} upcoming • {pastMeetings.length} completed
          </p>
        </div>
        <Button variant="primary">+ Schedule Meeting</Button>
      </div>

      {/* Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowCompleted(false)}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${
              !showCompleted
                ? 'bg-zinc-700 text-zinc-100'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }
          `}
        >
          Upcoming ({upcomingMeetings.length})
        </button>
        <button
          onClick={() => setShowCompleted(true)}
          className={`
            px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${
              showCompleted
                ? 'bg-zinc-700 text-zinc-100'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }
          `}
        >
          Completed ({pastMeetings.length})
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meeting List */}
        <div className="lg:col-span-2 space-y-4">
          {displayMeetings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-zinc-500">
                  {showCompleted
                    ? 'No completed meetings'
                    : 'No upcoming meetings scheduled'}
                </p>
              </CardContent>
            </Card>
          ) : (
            displayMeetings.map((meeting) => {
              const account = getAccountById(meeting.linkedAccountId);
              const deal = meeting.linkedDealId
                ? getDealById(meeting.linkedDealId)
                : null;
              const isSelected = selectedMeeting?.id === meeting.id;
              const isPast = meeting.scheduledAt <= now;

              return (
                <Card
                  key={meeting.id}
                  hover
                  onClick={() => setSelectedMeeting(meeting)}
                  className={isSelected ? 'ring-2 ring-zinc-600' : ''}
                >
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3
                            className={`text-base font-medium ${
                              meeting.completed
                                ? 'text-zinc-400'
                                : 'text-zinc-100'
                            }`}
                          >
                            {meeting.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${meetingTypeColors[meeting.meetingType]}`}
                          >
                            {meetingTypeLabels[meeting.meetingType]}
                          </span>
                          {meeting.completed && (
                            <Badge variant="success">Completed</Badge>
                          )}
                        </div>
                        <p className="text-sm text-zinc-500 mt-1">
                          {account?.name}
                          {deal && ` • ${deal.dealName}`}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={`text-sm font-medium ${
                            isPast && !meeting.completed
                              ? 'text-amber-400'
                              : 'text-zinc-300'
                          }`}
                        >
                          {meeting.scheduledAt.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                          {meeting.scheduledAt.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                          {' • '}
                          {meeting.duration} min
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500">
                      <span>
                        {meeting.attendeeIds.length} attendee
                        {meeting.attendeeIds.length !== 1 ? 's' : ''}
                      </span>
                      {meeting.meetingLink && <span>Virtual</span>}
                      {meeting.location && <span>{meeting.location}</span>}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Meeting Detail Panel */}
        <div className="lg:col-span-1">
          {selectedMeeting ? (
            <MeetingDetailPanel meeting={selectedMeeting} />
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-zinc-500">Select a meeting to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function MeetingDetailPanel({ meeting }: { meeting: Meeting }) {
  const account = getAccountById(meeting.linkedAccountId);
  const deal = meeting.linkedDealId ? getDealById(meeting.linkedDealId) : null;
  const attendees = meeting.attendeeIds
    .map((id) => getStakeholderById(id))
    .filter(Boolean);

  return (
    <div className="space-y-4 sticky top-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <CardTitle>{meeting.title}</CardTitle>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${meetingTypeColors[meeting.meetingType]}`}
            >
              {meetingTypeLabels[meeting.meetingType]}
            </span>
          </div>
          <CardDescription>
            {meeting.scheduledAt.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
            at{' '}
            {meeting.scheduledAt.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-zinc-500 mb-1">Account</p>
              <p className="text-sm text-zinc-200">{account?.name}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 mb-1">Duration</p>
              <p className="text-sm text-zinc-200">{meeting.duration} min</p>
            </div>
          </div>

          {deal && (
            <div>
              <p className="text-xs text-zinc-500 mb-1">Linked Deal</p>
              <p className="text-sm text-zinc-200">{deal.dealName}</p>
            </div>
          )}

          {(meeting.meetingLink || meeting.location) && (
            <div>
              <p className="text-xs text-zinc-500 mb-1">Location</p>
              {meeting.meetingLink ? (
                <a
                  href={meeting.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Join Meeting
                </a>
              ) : (
                <p className="text-sm text-zinc-200">{meeting.location}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendees */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Attendees</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-zinc-800">
            {attendees.map((attendee) => (
              <li key={attendee!.id} className="px-5 py-3">
                <p className="text-sm text-zinc-200">{attendee!.name}</p>
                <p className="text-xs text-zinc-500">{attendee!.role}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Agenda & Prep */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Agenda</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans">
            {meeting.agenda}
          </pre>
        </CardContent>
      </Card>

      {meeting.prepNotes && (
        <Card className="border-amber-900/50 bg-amber-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-amber-400">Prep Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-300">{meeting.prepNotes}</p>
          </CardContent>
        </Card>
      )}

      {meeting.postMeetingNotes && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Meeting Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-300">{meeting.postMeetingNotes}</p>
            {meeting.actionItemsGenerated && meeting.actionItemsGenerated.length > 0 && (
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 mb-2">Action Items</p>
                <ul className="space-y-2">
                  {meeting.actionItemsGenerated.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-emerald-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
