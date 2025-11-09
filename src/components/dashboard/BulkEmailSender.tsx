'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { EmailRecipient } from '@/types/dashboard';

interface BulkEmailResult {
  totalRecipients: number;
  validRecipients?: number;
  sent?: number;
  failed?: number;
  invalidEmails?: number;
  unsafeEmails?: number;
  validEmails?: number;
  results?: Array<{ email: string; name: string; success: boolean; error?: string }>;
  invalidEmailsList?: Array<{ email: string; reason?: string }>;
  unsafeEmailsList?: Array<{ email: string; reason?: string }>;
  previewHtml?: string;
  dryRun?: boolean;
}

export function BulkEmailSender() {
  const [recipients, setRecipients] = useState<EmailRecipient[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [emailColumn, setEmailColumn] = useState('');
  const [nameColumn, setNameColumn] = useState('');
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BulkEmailResult | null>(null);
  const [manualInput, setManualInput] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length > 0) {
          const firstRow = jsonData[0] as Record<string, unknown>;
          const cols = Object.keys(firstRow);
          setColumns(cols);
          
          // Store raw data for later processing
          (window as unknown as { excelData: unknown[] }).excelData = jsonData;
        }
      } catch (error) {
        alert('Error reading file. Please ensure it is a valid Excel file.');
        console.error(error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleColumnSelection = () => {
    if (!emailColumn || !nameColumn) {
      alert('Please select both email and name columns');
      return;
    }

    const excelData = (window as unknown as { excelData?: Array<Record<string, string>> }).excelData;
    if (!excelData) {
      alert('Please upload a file first');
      return;
    }

    const extractedRecipients: EmailRecipient[] = excelData
      .filter((row) => row[emailColumn] && row[nameColumn])
      .map((row) => ({
        email: String(row[emailColumn]).trim(),
        name: String(row[nameColumn]).trim(),
      }));

    setRecipients(extractedRecipients);
  };

  const handleManualInput = () => {
    try {
      const lines = manualInput.trim().split('\n');
      const parsed: EmailRecipient[] = [];

      for (const line of lines) {
        const parts = line.split(',').map(p => p.trim());
        if (parts.length >= 2) {
          parsed.push({
            email: parts[0],
            name: parts[1],
          });
        }
      }

      if (parsed.length === 0) {
        alert('No valid entries found. Format: email, name (one per line)');
        return;
      }

      setRecipients(parsed);
      setManualInput('');
    } catch (error) {
      alert('Error parsing manual input');
      console.error(error);
    }
  };

  const handleSend = async (dryRun: boolean = false) => {
    if (recipients.length === 0) {
      alert('Please add recipients first');
      return;
    }

    if (!subject || !message) {
      alert('Please provide subject and message');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/dashboard/send-bulk-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients,
          subject,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <p>Dear {name},</p>
              ${message.split('\n').map(line => `<p>${line}</p>`).join('')}
              <br>
              <p style="color: #666; font-size: 12px;">
                You are receiving this email because you are part of our community.
                If you wish to unsubscribe, please contact us at info@christcommunityglobal.org
              </p>
            </div>
          `,
          dryRun,
        }),
      });

      const data = await response.json();
      setResult(data);

      if (!dryRun && data.success) {
        alert(`Email sent successfully to ${data.sent} recipients`);
      }
    } catch (error) {
      alert('Error sending emails');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/dashboard/auth', { method: 'DELETE' });
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bulk Email Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Recipients</CardTitle>
          <CardDescription>
            Upload an Excel file or manually enter email addresses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Excel File (xlsx, xls, csv)</Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              disabled={loading}
            />
          </div>

          {columns.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email Column</Label>
                <Select value={emailColumn} onValueChange={setEmailColumn}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Name Column</Label>
                <Select value={nameColumn} onValueChange={setNameColumn}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select column" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map((col) => (
                      <SelectItem key={col} value={col}>
                        {col}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Button onClick={handleColumnSelection} disabled={!emailColumn || !nameColumn}>
                  Extract Recipients
                </Button>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <Label htmlFor="manual">Or Paste Manually (Format: email, name - one per line)</Label>
            <Textarea
              id="manual"
              placeholder="john@example.com, John Doe&#10;jane@example.com, Jane Smith"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              rows={5}
              disabled={loading}
              className="mt-2"
            />
            <Button onClick={handleManualInput} disabled={!manualInput.trim()} className="mt-2">
              Add Manual Entries
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recipients Preview */}
      {recipients.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recipients ({recipients.length})</CardTitle>
            <CardDescription>Review recipients before sending</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recipients.slice(0, 10).map((recipient, index) => (
                    <TableRow key={index}>
                      <TableCell>{recipient.email}</TableCell>
                      <TableCell>{recipient.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {recipients.length > 10 && (
                <p className="text-sm text-muted-foreground mt-2">
                  ...and {recipients.length - 10} more
                </p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setRecipients([])}
              className="mt-4"
              disabled={loading}
            >
              Clear Recipients
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Email Composition */}
      <Card>
        <CardHeader>
          <CardTitle>Compose Email</CardTitle>
          <CardDescription>
            Use &#123;name&#125; placeholder to personalize emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Email message body..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              disabled={loading}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => handleSend(true)}
              disabled={loading || recipients.length === 0}
              variant="outline"
            >
              Preview & Validate
            </Button>
            <Button
              onClick={() => handleSend(false)}
              disabled={loading || recipients.length === 0}
            >
              {loading ? 'Sending...' : 'Send Emails'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>{result.dryRun ? 'Preview & Validation Results' : 'Send Results'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
                <p className="text-2xl font-bold">{result.totalRecipients}</p>
              </div>
              {result.validEmails !== undefined && (
                <div>
                  <p className="text-sm text-muted-foreground">Valid Emails</p>
                  <p className="text-2xl font-bold text-green-600">{result.validEmails}</p>
                </div>
              )}
              {result.invalidEmails !== undefined && result.invalidEmails > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Invalid Emails</p>
                  <p className="text-2xl font-bold text-red-600">{result.invalidEmails}</p>
                </div>
              )}
              {result.unsafeEmails !== undefined && result.unsafeEmails > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Unsafe Emails</p>
                  <p className="text-2xl font-bold text-yellow-600">{result.unsafeEmails}</p>
                </div>
              )}
              {result.sent !== undefined && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Sent</p>
                    <p className="text-2xl font-bold text-green-600">{result.sent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Failed</p>
                    <p className="text-2xl font-bold text-red-600">{result.failed}</p>
                  </div>
                </>
              )}
            </div>

            {result.invalidEmailsList && result.invalidEmailsList.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Invalid Emails:</h4>
                <div className="space-y-1">
                  {result.invalidEmailsList.map((item, index) => (
                    <div key={index} className="text-sm">
                      <Badge variant="destructive" className="mr-2">
                        {item.email}
                      </Badge>
                      <span className="text-muted-foreground">{item.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.unsafeEmailsList && result.unsafeEmailsList.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Unsafe Emails (Disposable/Role-based):</h4>
                <div className="space-y-1">
                  {result.unsafeEmailsList.map((item, index) => (
                    <div key={index} className="text-sm">
                      <Badge variant="secondary" className="mr-2">
                        {item.email}
                      </Badge>
                      <span className="text-muted-foreground">{item.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.results && result.results.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Send Details:</h4>
                <div className="max-h-64 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.results.map((r, index) => (
                        <TableRow key={index}>
                          <TableCell>{r.email}</TableCell>
                          <TableCell>{r.name}</TableCell>
                          <TableCell>
                            {r.success ? (
                              <Badge variant="default">Sent</Badge>
                            ) : (
                              <Badge variant="destructive">Failed</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
