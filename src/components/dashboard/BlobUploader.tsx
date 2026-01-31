'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, RefreshCw, Video } from 'lucide-react';

type UploadResult = {
  pathname: string;
  url: string;
};

type StoredItem = UploadResult & {
  size?: number;
  uploadedAt?: string;
};

const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];
const videoExtensions = ['mp4', 'webm', 'mov', 'm4v', 'avi'];

const getExtension = (pathname: string) =>
  pathname.split('.').pop()?.toLowerCase() || '';

const isImage = (pathname: string) => imageExtensions.includes(getExtension(pathname));
const isVideo = (pathname: string) => videoExtensions.includes(getExtension(pathname));
const getDisplayName = (pathname: string) => pathname.split('/').pop() || pathname;

const folderOptions = [
  { value: 'BigChurch', label: 'Big Church Conference' },
  { value: '10CFC', label: '10 Welsh Cities for Christ' },
];

const isUnsupported = (file: File) => {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  return ['cr3', 'heic', 'heif'].includes(ext);
};

export function BlobUploader() {
  const [folder, setFolder] = useState(folderOptions[0].value);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);
  const [error, setError] = useState('');
  const [items, setItems] = useState<StoredItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const unsupportedFiles = useMemo(
    () => files.filter(isUnsupported),
    [files]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    setFiles(selected);
    setResults([]);
    setError('');
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError('Select one or more files to upload.');
      return;
    }

    setUploading(true);
    setError('');
    setResults([]);

    try {
      const formData = new FormData();
      formData.append('folder', folder);
      files.forEach((file) => formData.append('files', file));

      const response = await fetch('/api/dashboard/blob/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await response.json();
      setResults(data.items || []);
      await fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const fetchItems = async () => {
    setLoadingItems(true);
    setError('');
    try {
      const response = await fetch(`/api/dashboard/blob/list?folder=${encodeURIComponent(folder)}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to load files');
      }
      const data = await response.json();
      setItems(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load files');
    } finally {
      setLoadingItems(false);
    }
  };

  const handleDelete = async (pathname: string) => {
    if (!window.confirm('Delete this file from storage?')) return;

    try {
      const response = await fetch('/api/dashboard/blob/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pathname }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Delete failed');
      }

      await fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  useEffect(() => {
    fetchItems();
  }, [folder]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Media</CardTitle>
          <CardDescription>
            Upload multiple images or videos to the event gallery folders.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Destination Folder</Label>
              <Select value={folder} onValueChange={setFolder}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a folder" />
                </SelectTrigger>
                <SelectContent>
                  {folderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="media-files">Media Files</Label>
              <Input
                id="media-files"
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {files.length} file{files.length === 1 ? '' : 's'} selected
              </p>
              <div className="flex flex-wrap gap-2">
                {files.map((file) => (
                  <Badge key={file.name} variant={isUnsupported(file) ? 'destructive' : 'secondary'}>
                    {file.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {unsupportedFiles.length > 0 && (
            <div className="rounded-[var(--radius)] border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              HEIC/CR3 files won&apos;t display on the website. Please upload JPG, PNG, WebP, MP4, or WebM versions.
            </div>
          )}

          {error && (
            <div className="rounded-[var(--radius)] border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
            {uploading ? 'Uploading...' : 'Upload Files'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Stored Files</CardTitle>
              <CardDescription>Files currently in {folder}.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={fetchItems} disabled={loadingItems}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {loadingItems && <p className="text-sm text-muted-foreground">Loading files...</p>}
          {!loadingItems && items.length === 0 && (
            <p className="text-sm text-muted-foreground">No files found in this folder.</p>
          )}
          {!loadingItems && items.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item.pathname}
                  className="flex flex-col gap-3 border border-border/40 rounded-[var(--radius)] p-3 bg-background"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] border border-border/40 bg-white">
                    {isImage(item.pathname) ? (
                      <img
                        src={item.url}
                        alt={getDisplayName(item.pathname)}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : isVideo(item.pathname) ? (
                      <video className="h-full w-full object-cover" controls preload="metadata">
                        <source src={item.url} />
                      </video>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        Unsupported preview
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">{getDisplayName(item.pathname)}</p>
                    <a
                      className="text-xs text-primary underline"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open file
                    </a>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.pathname)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="text-sm text-muted-foreground">Upload complete.</div>
      )}
    </div>
  );
}
